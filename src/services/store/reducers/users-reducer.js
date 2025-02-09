import { USERS_ACTION_TYPES } from "../constants";

const initialUsersState = [];

export const usersReducer = (state = initialUsersState, { type, payload }) => {
  switch (type) {
    case USERS_ACTION_TYPES.GET_USERS:
      return [...payload];
    case USERS_ACTION_TYPES.CLEAR_USERS:
      return initialUsersState;
    case USERS_ACTION_TYPES.UPDATE_USER_ROLE: {
      /*Прибегнул в такому методу, т.к. redux ругается на прямую мутацию, 
      а как заменить роль пользователя из массива, не мутируя его - идей нет. 
      В redux toolkit таких проблем бы не было :(
      */
      //Делаем глубокую копию нашего state, чтобы redux не ругался
      const deepCopyState = JSON.parse(JSON.stringify(state));
      //ищем пользователя
      const user = deepCopyState.find((user) => user.login === payload.login);
      //меняем роль
      user.role_id = payload.role_id;
      //закидываем в наш store
      return [...deepCopyState];
    }
    case USERS_ACTION_TYPES.DELETE_USER:
      return [...state.filter((user) => user.id !== payload)];
    default:
      return state;
  }
};
