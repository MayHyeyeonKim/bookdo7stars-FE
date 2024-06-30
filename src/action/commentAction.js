import api from '../utils/api';
import * as types from '../constants/comment.constans';
import { commonUiActions } from './commonUiAction';

const createComment = (payload) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_COMMENT_REQUEST });
    const response = await api.post('/comments', payload);
    dispatch({ type: types.CREATE_COMMENT_SUCCESS, payload: response.data });
    dispatch(commonUiActions.showToastMessage('Comment added successfully!', 'success'));
  } catch (err) {
    dispatch({ type: types.CREATE_COMMENT_FAIL, payload: err.message });
    dispatch(commonUiActions.showToastMessage(err.message, 'error'));
  }
};

const getCommentsByBook = (bookId) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_COMMENT_LIST_REQUEST });

    const response = await api.get(`/comments/book/${bookId}`);
    dispatch({
      type: types.GET_COMMENT_LIST_SUCCESS,
      payload: response.data, // 서버에서 받은 댓글 데이터
    });
  } catch (error) {
    dispatch({ type: types.GET_COMMENT_LIST_FAIL, payload: error.message });
  }
};

const deleteComment = (commentId, bookId) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_COMMENT_REQUEST });
    await api.delete(`/comments/${commentId}`);
    dispatch({ type: types.DELETE_COMMENT_SUCCESS, payload: commentId });
    dispatch(getCommentsByBook(bookId)); // 댓글 삭제 후 목록 갱신
  } catch (error) {
    dispatch({ type: types.DELETE_COMMENT_FAIL, payload: error.message });
  }
};

const getMyComment = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_MY_COMMENT_REQUEST });
    const response = await api.get('/comments');
    dispatch({ type: types.GET_MY_COMMENT_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch({ type: types.GET_MY_COMMENT_FAIL, payload: err.error });
  }
};

export const commentActions = {
  createComment,
  getCommentsByBook,
  deleteComment,
  getMyComment,
};
