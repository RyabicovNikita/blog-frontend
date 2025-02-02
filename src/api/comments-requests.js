export const fetchCommentsPost = (id) =>
  fetch(`http://localhost:3005/comments?post_id=${id}`)
    .then((res) => res.json())
    .then((comments) => comments);

export const fetchDeleteComment = (idComment) =>
  fetch(`http://localhost:3005/comments/${idComment}`, {
    method: "DELETE",
  });
