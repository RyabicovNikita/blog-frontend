import { DateTime } from "luxon";

export const mapPost = (post, comments = post.comments) => ({
  ...post,
  comments: comments,
  published_at: DateTime.fromISO(post.published_at).toFormat("dd.MM.yyyy"),
});
