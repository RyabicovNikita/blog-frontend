import { request } from "../../utils";

export const addLike = (postId, userId) => request(`posts/${postId}/like`, "PATCH", { userId: userId });

export const deleteLike = (postId, likeId) => request(`posts/${postId}/like`, "DELETE", { likeId: likeId });
