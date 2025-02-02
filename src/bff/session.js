import { ROLES } from "../services";

const removeComment = () => console.log("remove comment");
export const addSession = (roleID) => {
  const session = {
    logout() {
      Object.keys(session).forEach((key) => {
        delete session[key];
      });
    },
  };
  switch (roleID) {
    case ROLES.ADMIN: {
      session.removeComment = removeComment;
      break;
    }
    case ROLES.MODERATOR: {
      session.removeComment = removeComment;
      break;
    }
    case ROLES.READER: {
      break;
    }
    default:
  }

  return session;
};
