import * as types from '../constants/comment.constans';

const initialState = {
  comments: [],
  createCommentSuccess: false,
  deleteCommentSuccess: false,
  loading: false,
  error: null,
  userComment: [],
};

function commentReducer(state = initialState, action) {
  switch (action.type) {
    case types.CREATE_COMMENT_REQUEST:
    case types.GET_COMMENT_LIST_REQUEST:
    case types.DELETE_COMMENT_REQUEST:
    case types.GET_MY_COMMENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        comments: [...state.comments, action.payload.comment],
      };
    case types.GET_COMMENT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        createCommentSuccess: true,
        comments: action.payload.comments,
      };
    case types.DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case types.GET_MY_COMMENT_SUCCESS:
      return { ...state, loading: false, userComment: action.payload };
    case types.CREATE_COMMENT_FAIL:
    case types.GET_COMMENT_LIST_FAIL:
    case types.DELETE_COMMENT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
export default commentReducer;
