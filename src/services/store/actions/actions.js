import { POST_ACTION_TYPES } from "./constants";

import { DateTime } from "luxon";

import { DATE_FORMATS } from "../../constants/constants";
import { request } from "../../../utils";
import { mapPost } from "../../helpers";

export const getUsers = async () => {
  return request("users").catch((error) => ({ error: error, errorMsg: "Ошибка сервера", payload: null }));
};

export const addNewComment = async (postId, content) => {
  return request(`${postId}/comments`, "POST", { content: content });
};

export const getPost = async (postId) => {
  const { error = "", body: post = {} } = await request(`${postId}`);
  if (error) return { error: error };
  const { comments: commentsPost } = post;
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
  return mapPost(post, sortByDateComments);
};

export const deletePost = async (postId) => {
  try {
    request(`${postId}`);
  } catch (error) {
    console.error(error);
  }
};

export const createNewPost = async (data) => {
  return request(`posts`, "POST", data);
};

export const deleteComment = (postId, commentId) => (dispatch) =>
  request(`${postId}/comments/${commentId}`, "DELETE").then(() =>
    dispatch({ type: POST_ACTION_TYPES.DELETE_COMMENT, payload: commentId })
  );

export const addLike = (postId, userId) => request(`${postId}/like`, "PATCH", { userId: userId });

export const deleteLike = (postId, likeId) => request(`${postId}/like`, "DELETE", { likeId: likeId });
