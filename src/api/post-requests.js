import { generateDateTime } from "../services";

export const fetchGetPosts = (page, limit) =>
  fetch(`http://localhost:3005/posts?_page=${page}&_limit=${limit}`)
    .then((res) => Promise.all([res.json(), res.headers.get("Link")]))
    .then(([posts, links]) => ({ posts, links }));

export const fetchGetPostById = (id) =>
  fetch(`http://localhost:3005/posts/${id}`)
    .then((res) => {
      if (res.ok) return res;
      return Promise.reject(res.status);
    })
    .then((res) => res.json())
    .then((post) => post);

export const fetchAddCommentInPost = (userId, postId, content) =>
  fetch(`http://localhost:3005/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      author_id: userId,
      post_id: postId,
      content,
      published_at: generateDateTime(),
    }),
  }).then((data) => data.json());

export const fetchDeletePost = (id) =>
  fetch(`http://localhost:3005/posts/${id}`, {
    method: "DELETE",
  });

export const fetchSavePost = (id, userValues) =>
  fetch(`http://localhost:3005/posts/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      ...userValues,
    }),
  }).then((updatedPostData) => updatedPostData.json());

export const fetchCreatePost = (data) =>
  fetch(`http://localhost:3005/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      ...data,
      published_at: generateDateTime(),
    }),
  }).then((data) => data.json());
