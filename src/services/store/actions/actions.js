import { POST_ACTION_TYPES, ROLES_ACTION_TYPES, USERS_ACTION_TYPES } from "./constants";
import {
  fetchAddCommentInPost,
  fetchCommentsPost,
  fetchDeletePost,
  fetchDeleteComment,
  fetchGetPostById,
  fetchGetUsers,
  fetchCreatePost,
  fetchGetPosts,
} from "../../../api";
import { fetchGetRoles } from "../../../api/roles-requests";
import { sessions } from "../../../bff/sessions";

import { DateTime } from "luxon";
import {
  fetchAddUserLike,
  fetchDeleteUserLike,
  fetchGetComments,
  fetchGetLikes,
  fetchGetPostLikedUsers,
} from "../../../api/likes-requests";
import { DATE_FORMATS, ROLES } from "../../constants/constants";

//Переделал на redux-toolkit
// export const setUser = (user) => ({
//   type: USER_ACTION_TYPES.SET_USER,
//   payload: user,
// });

export const getUsers = async (userSession) => {
  const accessRoles = [ROLES.ADMIN];
  const access = await sessions.access(userSession, accessRoles);
  if (!access) {
    return {
      error: "Доступ к данным недоступен для текущего пользователя",
      res: null,
    };
  }

  return fetchGetUsers()
    .then((users) => ({ type: USERS_ACTION_TYPES.GET_USERS, payload: users }))
    .catch((error) => ({ error: error, errorMsg: "Ошибка сервера", payload: null }));
};

export const getRoles = async (userSession) => {
  const accessRoles = [ROLES.ADMIN];
  const access = await sessions.access(userSession, accessRoles);
  if (!access) {
    return {
      error: "Доступ к данным недоступен для текущего пользователя",
      res: null,
    };
  }
  return fetchGetRoles()
    .then((roles) => ({ type: ROLES_ACTION_TYPES.GET_ROLES, payload: roles }))
    .catch((error) => ({ error: error, errorMsg: "Ошибка сервера", payload: null }));
};

export const addNewComment = async (user, postId, content) => {
  const accessRoles = [ROLES.ADMIN];
  const access = await sessions.access(user.session, accessRoles);
  if (!access) {
    return {
      error: "Оставлять комментарии могут только авторизованные пользователи",
      res: null,
    };
  }
  return fetchAddCommentInPost(user.id, postId, content).then((newComment) => ({ res: newComment }));
};

export const getCommentsWithAuthor = (postId) =>
  fetchCommentsPost(postId).then((comments) =>
    fetchGetUsers().then((users) =>
      comments.map((comment) => ({
        ...comment,
        author_login: users.find((user) => user.id === comment.author_id)?.login,
      }))
    )
  );

export const getPost = async (postId) => {
  const [post, commentsPost, likedUsers] = await Promise.all([
    fetchGetPostById(postId),
    getCommentsWithAuthor(postId),
    fetchGetPostLikedUsers(postId),
  ]);

  const sortByDateComments = commentsPost.sort((a, b) => {
    if (
      DateTime.fromFormat(a.published_at, DATE_FORMATS.DATETIME) >
      DateTime.fromFormat(b.published_at, DATE_FORMATS.DATETIME)
    )
      return -1;

    if (
      DateTime.fromFormat(a.published_at, DATE_FORMATS.DATETIME) <
      DateTime.fromFormat(b.published_at, DATE_FORMATS.DATETIME)
    )
      return 1;

    return 0;
  });
  return { post, comments: sortByDateComments, likedUsers };
};

export const deletePost = async (postId) => {
  try {
    const comments = await fetchCommentsPost(postId);
    comments.forEach(async ({ id }) => {
      await fetchDeleteComment(id);
    });
    await fetchDeletePost(postId);
    return { type: POST_ACTION_TYPES.CLEAR_POST_STATE };
  } catch (error) {
    console.error(error);
  }
};

export const createNewPost = async (hash, data) => {
  const accessRoles = [ROLES.ADMIN];
  const access = await sessions.access(hash, accessRoles);
  if (!access) {
    return {
      error: "Создание поста доступно только авторизованным пользователям",
      res: null,
    };
  }
  return fetchCreatePost(data).then((newPostData) => ({ res: newPostData }));
};

export const deleteComment = (commentId) => (dispatch) =>
  fetchDeleteComment(commentId).then(() => dispatch({ type: POST_ACTION_TYPES.DELETE_COMMENT, payload: commentId }));

export const getPosts = async (page, limit) => {
  const [postsWithLinks, likes, comments] = await Promise.all([
    fetchGetPosts(page, limit),
    fetchGetLikes(),
    fetchGetComments(),
  ]);
  const { posts, links } = postsWithLinks;
  return {
    links,
    posts: posts.map((post) => ({
      ...post,
      commentsCount: comments.filter((c) => c.post_id === post.id).length,
      likesCount: likes.filter((l) => l.post_id === post.id).length,
    })),
  };
};

export const addLike = (user_id, post_id) => (dispatch) =>
  fetchAddUserLike(user_id, post_id).then((likeData) => dispatch({ type: POST_ACTION_TYPES.LIKE, payload: likeData }));

export const deleteLike = (user_id, post_id) => (dispatch) =>
  fetchDeleteUserLike(user_id, post_id).then(() => dispatch({ type: POST_ACTION_TYPES.DISLIKE, payload: user_id }));
