import { ActionTypes } from "../constants";

const defaultState = {
  loading: true,
  data: [],
  detail: null,
  error: ""
};

const reducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case ActionTypes.POST_LOADING:
      return {
        ...state,
        loading: payload
      };
    case ActionTypes.SET_POSTS:
      return {
        ...state,
        data: payload,
        loading: false
      };
    case ActionTypes.POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case ActionTypes.GET_POST_DETAIL:
      return {
        ...state,
        detail: payload,
        loading: false
      };
    default:
      return state;
  }
};

export default reducer;
