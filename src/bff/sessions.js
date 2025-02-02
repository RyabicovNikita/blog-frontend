import { uuidv4 } from "../services";
import { addSession, deleteSession, getSession } from "../api/session-requests";

export const sessions = {
  list: {},
  create(user) {
    const hash = uuidv4();

    addSession(hash, user);

    return hash;
  },

  async remove(hash) {
    const session = await getSession(hash);
    if (!session) return;
    deleteSession(session.id);
  },
  async access(hash, accessRoles) {
    const session = await getSession(hash);
    return !!session?.user && accessRoles.includes(session?.user?.role_id);
  },
};
