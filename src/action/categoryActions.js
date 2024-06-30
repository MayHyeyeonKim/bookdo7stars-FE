import api from '../utils/api';
import * as types from '../constants/category.constants';

// 카테고리 불러오기.
const getCategoryList = (query) => async (dispatch) => {
  try {
    dispatch({ type: types.CATEGORY_GET_REQUEST });
    const response = await api.get('/category', {
      params: { ...query },
    });
    dispatch({ type: types.CATEGORY_GET_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch({ type: types.CATEGORY_GET_FAIL, payload: err });
    console.error(err);
  }
};
const setSelectedCategory = (category) => (dispatch) => {
  dispatch({ type: types.SET_SELECTED_CATEGORY, payload: category });
};

const setSelectedCategoryPath = (category) => (dispatch) => {
  dispatch({ type: types.SET_SELECTED_CATEGORY_PATH, payload: category });
};

const setSelectedCategoryId = (id) => (dispatch) => {
  dispatch({ type: types.SET_SELECTED_CATEGORY_ID, payload: id });
};
export const categoryActions = {
  getCategoryList,
  setSelectedCategory,
  setSelectedCategoryPath,
  setSelectedCategoryId,
};
