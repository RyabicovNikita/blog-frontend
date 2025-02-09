import { POSTS_ACTION_TYPES } from "../constants";

const initialPostsState = [];

export const postsReducer = (state = initialPostsState, { type, payload }) => {
  switch (type) {
    case POSTS_ACTION_TYPES.GET_POSTS:
      return [...state, ...payload];
    case POSTS_ACTION_TYPES.CLEAR_POSTS:
      return initialPostsState;
    default:
      return state;
  }
};
