import * as types from "../constants/blog.constants";
const initialState = {
  blogs: [],
  totalPageNum: 1,
  offset: 0,
  selectedBlog: null,
  loading: false,
};

const blogReducer = (state = initialState, action) => {
  const { type, payload } = action;
  console.log("payload", type);
  switch (type) {
    case types.GET_BLOGS_REQUEST:
      return { ...state, loading: true };
    case types.GET_BLOGS_SUCCESS:
      return {
        ...state,
        blogs: payload.selectedData,
        totalPageNum: payload.totalPages,
        offset: payload.offset,
        loading: false,
      };
    case types.GET_BLOGS_FAILURE:
      return { ...state, loading: false };

    case types.POST_NEW_POST_REQUEST:
      return { ...state, loading: true };
    case types.POST_NEW_POST_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case types.POST_NEW_POST_FAILURE:
      return { ...state, loading: false };

    case types.PUT_POST_REQUEST:
      return { ...state, loading: true };
    case types.PUT_POST_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case types.PUT_POST_FAILURE:
      return { ...state, loading: false };

    case types.GET_SINGLE_BLOG_REQUEST:
      return { ...state, loading: true };
    case types.GET_SINGLE_BLOG_REQUEST_SUCCESS:
      return { ...state, selectedBlog: payload, loading: false };
    case types.GET_SINGLE_BLOG_REQUEST_FAILURE:
      return { ...state, loading: false };

    case types.DELETE_BLOG_REQUEST:
      return { ...state, loading: true };
    case types.DELETE_BLOG_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedBlog: {},
      };
    case types.DELETE_BLOG_FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default blogReducer;
