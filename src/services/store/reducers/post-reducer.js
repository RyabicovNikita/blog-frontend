import { POST_ACTION_TYPES } from "../actions";

const initialPostState = {};

export const postReducer = (state = initialPostState, { type, payload }) => {
  switch (type) {
    case POST_ACTION_TYPES.GET_POST:
      return { ...state, ...payload };
    case POST_ACTION_TYPES.ADD_COMMENT:
      return { ...state, comments: [payload, ...state.comments] };
    case POST_ACTION_TYPES.GET_COMMENTS:
      return { ...state, comments: [...payload] };
    case POST_ACTION_TYPES.CLEAR_POST_STATE:
      return initialPostState;
    case POST_ACTION_TYPES.UPDATE_POST:
      return { ...state, ...payload };
    case POST_ACTION_TYPES.DELETE_COMMENT:
      return { ...state, comments: state.comments.filter((comment) => comment.id !== payload) };
    // case POST_ACTION_TYPES.LIKE:
    //   return { ...state, likedUsers: [payload, ...state.likedUsers] };
    case POST_ACTION_TYPES.DISLIKE:
      return { ...state, likes: state.likes.filter(({ _id }) => _id !== payload) };
    default:
      return state;
  }
};
