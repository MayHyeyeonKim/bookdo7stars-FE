import * as types from '../constants/favorite.constants';
const initialState = {
  loading: false,
  error: '',
  favorite: [],
};

function favoriteReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.GET_FAVORITE_REQUEST:
    case types.ADD_FAVORITE_REQUEST:
    case types.DELETE_FAVORITE_REQUEST:
      return { ...state, loading: true };

    case types.GET_FAVORITE_SUCCESS:
      return { ...state, loading: false, error: '', favorite: payload.favorite.favorite };

    case types.ADD_FAVORITE_SUCCESS:
    case types.DELETE_FAVORITE_SUCCESS:
      return { ...state, loading: false, error: '' };

    case types.GET_FAVORITE_FAIL:
    case types.GET_FAVORITE_FAIL:
    case types.DELETE_FAVORITE_FAIL:
      return { ...state, loading: false, error: payload };
    case types.CLEAR_FAVORITE:
      return { ...state, loading: false, favorite: [] };
    default:
      return state;
  }
}

export default favoriteReducer;
