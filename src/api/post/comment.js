import { POSTS_ACTION_TYPES } from "../../services/store/constants";
import { request } from "../../utils";

export const addNewComment = async (postId, content) => {
  return request(`posts/${postId}/comments`, "POST", { content: content });
};

export const deleteComment = (postId, commentId) => (dispatch) =>
  request(`posts/${postId}/comments/${commentId}`, "DELETE").then(() =>
    dispatch({ type: POSTS_ACTION_TYPES.DELETE_COMMENT, payload: commentId })
  );
