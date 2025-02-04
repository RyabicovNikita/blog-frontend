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

import { DateTime } from "luxon";
import {
  fetchAddUserLike,
  fetchDeleteUserLike,
  fetchGetComments,
  fetchGetLikes,
  fetchGetPostLikedUsers,
} from "../../../api/likes-requests";
import { DATE_FORMATS, ROLES } from "../../constants/constants";
import { request } from "../../../utils";
import { mapPost } from "../../helpers";

//Переделал на redux-toolkit
// export const setUser = (user) => ({
//   type: USER_ACTION_TYPES.SET_USER,
//   payload: user,
// });

export const getUsers = async (userSession) => {
  const accessRoles = [ROLES.ADMIN];
  // const access = await sessions.access(userSession, accessRoles);
  // if (!access) {
  //   return {
  //     error: "Доступ к данным недоступен для текущего пользователя",
  //     res: null,
  //   };
  // }

  return fetchGetUsers()
    .then((users) => ({ type: USERS_ACTION_TYPES.GET_USERS, payload: users }))
    .catch((error) => ({ error: error, errorMsg: "Ошибка сервера", payload: null }));
};

export const getRoles = async (userSession) => {
  const accessRoles = [ROLES.ADMIN];
  // const access = await sessions.access(userSession, accessRoles);
  // if (!access) {
  //   return {
  //     error: "Доступ к данным недоступен для текущего пользователя",
  //     res: null,
  //   };
  // }
  return fetchGetRoles()
    .then((roles) => ({ type: ROLES_ACTION_TYPES.GET_ROLES, payload: roles }))
    .catch((error) => ({ error: error, errorMsg: "Ошибка сервера", payload: null }));
};

export const addNewComment = async (postId, content) => {
  return request(`/posts/${postId}/comments`, "POST", { content: content });
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
  const { error = "", body: post = {} } = await request(`/posts/${postId}`);
  if (error) return { error: error };
  // const [post, commentsPost, likedUsers] = await Promise.all([
  //   fetchGetPostById(postId),
  //   getCommentsWithAuthor(postId),
  //   fetchGetPostLikedUsers(postId),
  // ]);
  const { comments: commentsPost } = post;
  const likedUsers = [];
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
  return { post: mapPost(post), comments: sortByDateComments, likedUsers };
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

export const createNewPost = async (data) => {
  return request(`/posts`, "POST", data);
  // return fetchCreatePost(data).then((newPostData) => ({ res: newPostData }));
};

export const deleteComment = (postId, commentId) => (dispatch) =>
  request(`/posts/${postId}/comments/${commentId}`, "DELETE").then(() =>
    dispatch({ type: POST_ACTION_TYPES.DELETE_COMMENT, payload: commentId })
  );

export const getPosts = async (page, limit) => {
  request(`/posts?search`);
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
