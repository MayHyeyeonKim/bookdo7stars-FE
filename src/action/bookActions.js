import api from '../utils/api';
import * as types from '../constants/book.constants';
import { BOOK_GET_BY_GROUP_REQUEST } from '../constants/book.constants';
import { Response } from '../../node_modules/whatwg-fetch/fetch';
import { type } from '@testing-library/user-event/dist/type';
import { commonUiActions } from './commonUiAction';

// 도서 정보 불러오기.

const getBookList = (query) => async (dispatch) => {
  try {
    dispatch({ type: types.BOOK_GET_REQUEST });
    const response = await api.get('/book', {
      params: { ...query },
    });
    dispatch({ type: types.BOOK_GET_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch({ type: types.BOOK_GET_FAIL, payload: err });
    console.error(err);
  }
};

const getBookListByGroup = (bookGroup, query) => async (dispatch) => {
  try {
    dispatch({ type: types.BOOK_GET_BY_GROUP_REQUEST });
    const response = await api.get(`/book/group/${bookGroup}`, {
      params: { query },
    });
    dispatch({ type: types.BOOK_GET_BY_GROUP_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch({ type: types.BOOK_GET_BY_GROUP_FAIL, payload: err });
    console.error(err);
  }
};

const getBookListByCategory = (categoryId) => async (dispatch) => {
  try {
    dispatch({ type: types.BOOK_GET_BY_CATEGORY_REQUEST });
    const response = await api.get(`/book/category/${categoryId}`);

    dispatch({ type: types.BOOK_GET_BY_CATEGORY_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch({ type: types.BOOK_GET_BY_CATEGORY_FAIL, payload: err });
    console.error(err);
  }
};

// 도서 디테일 불러오기.
const getBookDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_BOOK_DETAIL_REQUEST });
    const response = await api.get(`book/detail/${id}`);
    if (response.status !== 200) throw new Error(response.error);
    dispatch({ type: types.GET_BOOK_DETAIL_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: types.GET_BOOK_DETAIL_FAIL, payload: error.error });
    dispatch(commonUiActions.showToastMessage(error.error, 'error'));
  }
};

// 도서 등록.
const createBook = (bookForm) => async (dispatch) => {
  try {
    dispatch({ type: types.BOOK_CREATE_REQUEST });
    const response = await api.post('/book', bookForm);
    dispatch({ type: types.BOOK_CREATE_SUCCESS });
    dispatch(commonUiActions.showToastMessage('도서 상품을 추가 했습니다', 'success'));
    dispatch(getBookList());
  } catch (err) {
    dispatch({ type: types.BOOK_CREATE_FAIL, payload: err.error });
    dispatch(commonUiActions.showToastMessage(err.error, 'error'));
  }
};

// 도서 삭제.
const deleteBook = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.BOOK_DELETE_REQUEST });
    const response = await api.delete(`/book/${id}`);
    dispatch({ type: types.BOOK_DELETE_SUCCESS });
    dispatch(getBookList());
  } catch (err) {
    dispatch({ type: types.BOOK_DELETE_FAIL, payload: err.error });
  }
};

// 도서 수정.
const updateBook = (bookForm, id) => async (dispatch) => {
  try {
    dispatch({ type: types.BOOK_EDIT_REQUEST });
    const response = await api.put(`/book/${id}`, bookForm);
    dispatch({ type: types.BOOK_EDIT_SUCCESS });
    dispatch(commonUiActions.showToastMessage('도서 정보 수정을 완료했습니다', 'success'));
    dispatch(getBookList());
  } catch (err) {
    dispatch({ type: types.BOOK_EDIT_FAIL, payload: err.error });
    dispatch(commonUiActions.showToastMessage(err.error, 'error'));
  }
};

const setBookGroup = (payload) => (dispatch) => {
  dispatch({ type: types.SET_BOOK_GROUP, payload });
};
const resetBookListByCategory = (payload) => (dispatch) => {
  dispatch({ type: types.RESET_BOOK_BY_CATEGORY, payload });
};

export const bookActions = {
  getBookList,
  getBookListByCategory,
  getBookListByGroup,
  getBookDetail,
  createBook,
  deleteBook,
  updateBook,
  setBookGroup,
  resetBookListByCategory,
};
