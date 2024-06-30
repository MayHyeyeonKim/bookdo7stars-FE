import * as types from '../constants/contact.constans';

const initialState = {
  loading: false,
  user: null,
  error: '',
  contacts: [],
  contact: {},
  userContacts: [],
};

function contactReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.CREATE_CONTACT_SUCCESS:
      return { ...state, contacts: payload.data };
    case types.CREATE_CONTACT_FAIL:
      return { ...state, error: payload };
    case types.GET_CONTACTS_BY_USER_SUCCESS:
      return { ...state, userContacts: payload.data };
    case types.GET_CONTACTS_BY_USER_FAIL:
      return { ...state, error: payload };

    default:
      return state;
  }
}

export default contactReducer;
