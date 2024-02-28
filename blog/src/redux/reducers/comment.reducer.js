import * as types from "../constants/comment.constants";
const initialState = {
  comments: [],
  totalPageNum: 1,
  offset: 0,
  selectedBlog: null,
  loading: false,
};

const commentReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_COMMENTS_REQUEST:
      return { ...state, loading: true };
    case types.GET_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: payload,
        totalPageNum: payload.totalPages,
        offset: payload.offset,
        loading: false,
      };
    case types.GET_COMMENTS_FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default commentReducer;
