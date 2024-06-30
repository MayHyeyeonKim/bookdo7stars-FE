import * as types from '../constants/category.constants';
const initialState = {
  categories: [],
  getCategoriesError: null,
  getCategoriesLoading: false,
  selectedCategory: null,
  selectedCategoryPath: null,
  selectedCategoryId: null,
};

function categoryReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.CATEGORY_GET_REQUEST:
      return { ...state, getCategoriesLoading: true };
    case types.CATEGORY_GET_SUCCESS:
      return { ...state, getCategoriesError: false, categories: payload };
    case types.CATEGORY_GET_FAIL:
      return { ...state, getCategoriesLoading: false, categories: [], getCategoriesError: payload };
    case types.SET_SELECTED_CATEGORY:
      return { ...state, selectedCategory: payload };
    case types.SET_SELECTED_CATEGORY_PATH:
      return { ...state, selectedCategoryPath: payload };
    case types.SET_SELECTED_CATEGORY_ID:
      return { ...state, selectedCategoryId: payload };
    default:
      return state;
  }
}

export default categoryReducer;
