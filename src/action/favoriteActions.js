import api from '../utils/api';
import * as types from '../constants/favorite.constants';
import { commonUiActions } from './commonUiAction';

// 찜한 도서 불러오기.
const getFavorite = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_FAVORITE_REQUEST });
    const response = await api.get('/favorite');
    dispatch({ type: types.GET_FAVORITE_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch({ type: types.GET_FAVORITE_FAIL, payload: err.error });
    dispatch(commonUiActions.showToastMessage(err.error, 'error'));
  }
};

// 도서 찜하기.
const addFavorite = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.ADD_FAVORITE_REQUEST });
    const response = await api.put(`/favorite/${id}`);
    dispatch({ type: types.ADD_FAVORITE_SUCCESS, payload: response.data });
    dispatch(commonUiActions.showToastMessage('도서를 찜했습니다.', 'success'));
    dispatch(getFavorite());
  } catch (err) {
    dispatch({ type: types.ADD_FAVORITE_FAIL, payload: err.error });
    dispatch(commonUiActions.showToastMessage(err.error, 'error'));
  }
};

// 찜한 도서 삭제하기.
const deleteFavorite = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_FAVORITE_REQUEST });
    const response = await api.delete(`/favorite/${id}`);
    dispatch({ type: types.DELETE_FAVORITE_SUCCESS });
    dispatch(commonUiActions.showToastMessage('도서의 찜하기를 취소했습니다.', 'success'));
    dispatch(getFavorite());
  } catch (err) {
    dispatch({ type: types.DELETE_FAVORITE_FAIL, payload: err.error });
    dispatch(commonUiActions.showToastMessage(err.error, 'error'));
  }
};

const clearFavorite = () => ({ type: types.CLEAR_FAVORITE });

export const favoriteActions = {
  getFavorite,
  addFavorite,
  deleteFavorite,
  clearFavorite,
};
