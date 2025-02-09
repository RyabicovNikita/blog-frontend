import { DateTime } from "luxon";
import { mapPost } from "../../services/helpers";
import { request } from "../../utils";
import { DATE_FORMATS } from "../../services";

export const getPost = async (postId) => {
  const { error = "", body: post = {} } = await request(`posts/${postId}`);
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

export const createNewPost = (data) => request(`posts`, "POST", data);

export const deletePost = (postId) => request(`posts/${postId}`, "DELETE");
