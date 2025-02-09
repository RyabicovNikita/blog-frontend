import { request } from "../utils";

export const saveUser = (id, data) => request(`users/${id}`, "PATCH", data).then(({ body }) => body);
export const deleteUser = (id) => request(`users/${id}`, "DELETE");

export const getUsers = async () => {
  return request("users").catch((error) => ({ error: error, errorMsg: "Ошибка сервера", payload: null }));
};
