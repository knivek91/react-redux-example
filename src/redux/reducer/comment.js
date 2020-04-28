import { ActionTypes } from "../constants";

const defaultState = {
  loading: true,
  data: { post: {}, data: [] },
  error: ""
};

const reducer = (state = defaultState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.COMMENTS_LOADING:
      return {
        ...state,
        loading: payload
      };
    case ActionTypes.SET_COMMENTS_POST:
      return {
        ...state,
        data: payload,
        loading: false
      };
    case ActionTypes.COMMENTS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case ActionTypes.ADD_COMMENT_POST:
      return {
        ...state,
        data: {
          post: payload.post,
          data: [
            ...state.data.data,
            {
              id: state.data.data.length + 1,
              ...payload.data
            }
          ]
        }
      };
    default:
      return state;
  }
};

export default reducer;
