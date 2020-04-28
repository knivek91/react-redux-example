import axios from "axios";

import { ActionTypes } from "../constants";

//actions
const setLoadingPost = l => ({
  type: ActionTypes.POST_LOADING,
  payload: l
});

const setErrorPost = e => ({
  type: ActionTypes.POST_ERROR,
  payload: e
});

const setDataPost = d => ({
  type: ActionTypes.SET_POSTS,
  payload: d
});

const setLoadingComment = l => ({
  type: ActionTypes.COMMENTS_LOADING,
  payload: l
});

const setErrorComment = e => ({
  type: ActionTypes.COMMENTS_ERROR,
  payload: e
});

const setDataComment = d => ({
  type: ActionTypes.SET_COMMENTS_POST,
  payload: d
});

// async actions
export const getPost = () => {
  return async dispatch => {
    try {
      dispatch(setLoadingPost(true));
      const { data } = await axios(
        "https://jsonplaceholder.typicode.com/posts"
      );
      dispatch(setDataPost(data));
    } catch (e) {
      dispatch(setErrorPost(e.message));
    }
  };
};

export const getCommentsByPost = id => {
  return async (dispatch, getState) => {
    if (isNaN(id) || id <= 0) {
      dispatch(
        setErrorComment("Post Id cannot be less than 0 or alphanumeric.")
      );
    } else {
      try {
        dispatch(setLoadingComment(true));
        const { data } = await axios(
          "https://jsonplaceholder.typicode.com/comments"
        );
        const state = getState();
        const post = state.post.data.find(p => p.id === id);
        // could have a validation when the user refresh the browser (post `data` will be `[]`), so we can get the post by the Id and fix that
        // but the api doesn't support that
        const byPost = data.filter(d => d.postId === id);
        dispatch(setDataComment({ post: post, data: byPost }));
      } catch (e) {
        dispatch(setErrorComment(e.message));
      }
    }
  };
};
