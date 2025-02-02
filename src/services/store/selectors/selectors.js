export const selectUserRole = ({ user }) => user.role_id;
export const selectUserLogin = ({ user }) => user.login;
export const selectUser = ({ user }) => user;
export const selectUserSession = ({ user }) => user.session;

export const selectUsers = ({ users }) => users;

export const selectRoles = ({ roles }) => roles.roles;

export const selectPosts = ({ posts }) => posts;

export const selectFilterPostsByTitle = ({ posts }, filter) => posts.filter((post) => post.title.indexOf(filter) >= 0);

export const selectPost = ({ post }) => post.post;
export const selectPostID = ({ post }) => post.post?.id;
export const selectLikedUsers = ({ post }) => post.likedUsers;
export const selectComments = ({ post }) => post.comments;
