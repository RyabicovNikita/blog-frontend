import { request } from "../../utils";

export const addNewComment = (postId, content) => request(`posts/${postId}/comments`, "POST", { content: content });

export const deleteComment = (postId, commentId) => request(`posts/${postId}/comments/${commentId}`, "DELETE");
