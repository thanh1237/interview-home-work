import * as types from "../constants/comment.constants";
import api from "../api";
import { toast } from "react-toastify";

const commentsRequest = (blogId) => async (dispatch) => {
  console.log(blogId);
  dispatch({ type: types.GET_COMMENTS_REQUEST, payload: null });
  try {
    let res = await api.get(
      `https://jsonplaceholder.typicode.com/posts/${blogId}/comments`
    );
    dispatch({ type: types.GET_COMMENTS_SUCCESS, payload: res.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: types.GET_COMMENTS_FAILURE, payload: error });
    toast.error(error);
  }
};

export const commentActions = {
  commentsRequest,
};
