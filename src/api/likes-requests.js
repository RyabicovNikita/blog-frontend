export const fetchGetLikes = () =>
  fetch("http://localhost:3005/likes")
    .then((res) => res.json())
    .then((likes) => likes);

export const fetchGetComments = () =>
  fetch("http://localhost:3005/comments")
    .then((res) => res.json())
    .then((comments) => comments);

export const fetchGetLike = (user_id, post_id) =>
  fetch(`http://localhost:3005/likes?user_id=${user_id}&post_id=${post_id}`).then((res) => res.json());

export const fetchGetPostLikedUsers = (post_id) =>
  fetch(`http://localhost:3005/likes?post_id=${post_id}`)
    .then((res) => res.json())
    .then((likes) => likes);
export const fetchAddUserLike = (user_id, post_id) =>
  fetch("http://localhost:3005/likes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      user_id,
      post_id,
    }),
  }).then((newUserData) => newUserData.json());

export const fetchDeleteUserLike = (user_id, post_id) =>
  fetchGetLike(user_id, post_id).then((likeArr) => {
    if (likeArr.length === 0) return;
    const like = likeArr[0];
    return fetch(`http://localhost:3005/likes/${like.id}`, {
      method: "DELETE",
    });
  });
