import { fetchAddUser, fetchGetUser } from "../services";
import { sessions } from "./sessions";

export const server = {
  async authorize(inputLogin, inputPassword) {
    let user;
    let serverError;
    try {
      user = await fetchGetUser(inputLogin);
    } catch (error) {
      console.error(error);
      serverError = "Ошибка сервера";
    }

    if (!user)
      return {
        error: serverError ?? "Пользователь не найден",
        res: null,
      };
    if (inputPassword !== user.password)
      return {
        error: "Неверный пароль",
        res: null,
      };

    return {
      error: null,
      res: {
        id: user.id,
        login: user.login,
        role_id: user.role_id,
        session: sessions.create(user),
      },
    };
  },
  async register(inputLogin, inputPassword) {
    let user;
    try {
      user = await fetchGetUser(inputLogin);
      if (user)
        return {
          error: "Такой логин уже занят",
          res: null,
        };
      user = await fetchAddUser(inputLogin, inputPassword);
    } catch (error) {
      console.error(error);
      return {
        error: "Ошибка сервера",
        res: null,
      };
    }
    return {
      error: null,
      res: {
        id: user.id,
        login: user.login,
        role_id: user.role_id,
        session: sessions.create(user),
      },
    };
  },
  async logout(session) {
    sessions.remove(session);
  },
};
