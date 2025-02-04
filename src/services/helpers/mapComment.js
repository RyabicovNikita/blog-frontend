import { DateTime } from "luxon";

export const mapComment = (comment) => ({
  ...comment,
  published_at: DateTime.fromISO(comment.published_at).toFormat("dd.MM.yyyy"),
});
