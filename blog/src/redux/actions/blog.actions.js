import * as types from "../constants/blog.constants";
import api from "../api";
import { toast } from "react-toastify";

const blogsRequest =
  (pageNum = 1, lim = 10, title) =>
  async (dispatch) => {
    dispatch({ type: types.GET_BLOGS_REQUEST, payload: null });
    try {
      let url = title
        ? `https://jsonplaceholder.typicode.com/posts?title=${title}`
        : "https://jsonplaceholder.typicode.com/posts";
      let page = parseInt(pageNum) || 1;
      let limit = parseInt(lim) || 10;
      let res = await api.get(url);
      const totalBlogs = res.data.length;
      const totalPages = Math.ceil(totalBlogs / limit);
      const offset = limit * (page - 1);
      let selectedData = res.data.slice(offset, limit * page);
      res = { ...res, totalPages, offset, selectedData: selectedData };
      toast.success("Get Posts success");
      dispatch({ type: types.GET_BLOGS_SUCCESS, payload: res });
    } catch (error) {
      console.log(error);
      dispatch({ type: types.GET_BLOGS_FAILURE, payload: error });
      toast.error(error);
    }
  };

const addNewPost = (params) => async (dispatch) => {
  dispatch({ type: types.POST_NEW_POST_REQUEST, payload: null });
  try {
    let { title } = params;
    const res = await api.post(
      "https://jsonplaceholder.typicode.com/posts",
      params
    );
    dispatch({ type: types.POST_NEW_POST_SUCCESS, payload: res.data.data });
    toast.success(`Post with title '${title}' has been created`);
  } catch (error) {
    console.log(error);
    dispatch({ type: types.POST_NEW_POST_FAILURE, payload: error });
  }
};

const getSingleBlog = (blogId) => async (dispatch) => {
  dispatch({ type: types.GET_SINGLE_BLOG_REQUEST, payload: null });
  try {
    const res = await api.get(
      `https://jsonplaceholder.typicode.com/posts/${blogId}`
    );
    dispatch({
      type: types.GET_SINGLE_BLOG_REQUEST_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({ type: types.GET_SINGLE_BLOG_REQUEST_FAILURE, payload: error });
  }
};

const updatePost = (params) => async (dispatch) => {
  dispatch({ type: types.PUT_POST_REQUEST, payload: null });
  try {
    let { title, id } = params;
    const res = await api.put(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      params
    );
    dispatch({ type: types.PUT_POST_SUCCESS, payload: res.data.data });
    toast.success(`Post with title '${title}' has been updated`);
  } catch (error) {
    console.log(error);
    dispatch({ type: types.PUT_POST_FAILURE, payload: error });
  }
};

const deleteBlog = (id) => async (dispatch) => {
  dispatch({ type: types.DELETE_BLOG_REQUEST, payload: null });
  try {
    const res = await api.delete(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    dispatch({
      type: types.DELETE_BLOG_SUCCESS,
      payload: res.data,
    });
    toast.success("The blog has been deleted!");
  } catch (error) {
    console.log(error);
    dispatch({ type: types.DELETE_BLOG_FAILURE, payload: error });
  }
};

export const blogActions = {
  blogsRequest,
  addNewPost,
  updatePost,
  getSingleBlog,
  deleteBlog,
};
