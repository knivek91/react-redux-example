import { combineReducers } from "redux";
import post from "./post";
import comments from "./comment";

export default combineReducers({
  post,
  comments
});
