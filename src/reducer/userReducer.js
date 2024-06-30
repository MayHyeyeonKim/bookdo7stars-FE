import * as types from '../constants/user.constants';

const initialState = {
  loading: false,
  user: null,
  error: '',
  users: [],
  adminError: '',
};

function userReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.USER_LOGIN_REQUEST:
    case types.REGISTER_USER_REQUEST:
    case types.GOOGLE_LOGIN_REQUEST:
    case types.KAKAO_LOGIN_REQUEST:
    case types.GITHUB_LOGIN_REQUEST:
    case types.LOGIN_WITH_TOKEN_REQUEST:
    case types.GET_ADMIN_REQUEST:
    case types.GET_All_USERS_REQUEST:
    case types.USER_LEVEL_EDIT_REQUEST:
    case types.USER_CONFIRM_REQUEST:
    case types.USER_INFO_REQUEST:
    case types.USER_DELETE_REQUEST:
      return { ...state, loading: true };

    case types.USER_LOGIN_SUCCESS:
    case types.LOGIN_WITH_TOKEN_SUCCESS:
    case types.GOOGLE_LOGIN_SUCCESS:
    case types.KAKAO_LOGIN_SUCCESS:
    case types.GITHUB_LOGIN_SUCCESS:
      return { ...state, loading: false, user: payload.user, error: '' };
    case types.USER_LEVEL_EDIT_SUCCESS:
      return { ...state, loading: false, user: payload, error: '' };
    case types.USER_CONFIRM_SUCCESS:
    case types.USER_INFO_SUCCESS:
    case types.USER_DELETE_SUCCESS:
      return { ...state, loading: false, error: '' };

    case types.USER_LOGIN_FAIL:
    case types.REGISTER_USER_FAIL:
    case types.GOOGLE_LOGIN_FAIL:
    case types.KAKAO_LOGIN_FAIL:
    case types.GITHUB_LOGIN_FAIL:
    case types.GET_ADMIN_FAIL:
    case types.GET_All_USERS_FAIL:
    case types.USER_LEVEL_EDIT_FAIL:
    case types.USER_CONFIRM_FAIL:
    case types.USER_INFO_FAIL:
    case types.USER_DELETE_FAIL:
      return { ...state, loading: false, error: payload };

    case types.USER_LOGOUT:
      return { ...state, user: null };

    case types.LOGIN_WITH_TOKEN_FAIL:
      return { ...state, loading: false };

    case types.GET_ADMIN_SUCCESS:
    case types.GET_All_USERS_SUCCESS:
      return { ...state, loading: false, users: payload, adminError: '' };

    case types.REGISTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: [...state.users, payload],
        error: '',
      };

    default:
      return state;
  }
}

export default userReducer;
