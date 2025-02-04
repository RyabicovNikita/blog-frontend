import { DateTime } from "luxon";

export const mapPost = (post) => ({ ...post, published_at: DateTime.fromISO(post.published_at).toFormat("dd.MM.yyyy") });
