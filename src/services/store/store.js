import { postReducer, postsReducer, usersReducer } from "./reducers";
import { rolesReducer } from "./reducers/roles-reducer";

import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slice/authSlice";

// const reducer2 = combineReducers({
//   user: userReducer,
//   users: usersReducer,
//   post: postReducer,
//   posts: postsReducer,
//   roles: rolesReducer,
// });

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// export const store = createStore(reducer2, composeEnhancers(applyMiddleware(thunk)));

const rootReducer = {
  user: userReducer,
  users: usersReducer,
  post: postReducer,
  posts: postsReducer,
  roles: rolesReducer,
};

const createStore = () => {
  const store = configureStore({
    reducer: rootReducer,
  });
  return store;
};

export const store = createStore();
