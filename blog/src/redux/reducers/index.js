import { combineReducers } from "redux";
import blogReducer from "./blog.reducer";
import commentReducer from "./comment.reducer";

export default combineReducers({
  blog: blogReducer,
  comment: commentReducer,
});
