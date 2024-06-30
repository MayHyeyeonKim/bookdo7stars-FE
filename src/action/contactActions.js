import api from '../utils/api';
import * as types from '../constants/contact.constans';
import { commonUiActions } from './commonUiAction';

const createContact = (payload) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_CONTACT_REQUEST });
    const response = await api.post('/contact', payload);
    dispatch({ type: types.CREATE_CONTACT_SUCCESS, payload: response.data });
    dispatch(commonUiActions.showToastMessage('문의사항이 정상적으로 접수 되었습니다.', 'success'));
  } catch (err) {
    dispatch({ type: types.CREATE_CONTACT_FAIL, payload: err.message });
    dispatch(commonUiActions.showToastMessage(err.message, 'error'));
  }
};

const getContactsByUser = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_CONTACTS_BY_USER_REQUEST });
    const response = await api.get('/contact/user');
    dispatch({ type: types.GET_CONTACTS_BY_USER_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch({ type: types.GET_CONTACTS_BY_USER_FAIL, payload: err.message });
    dispatch(commonUiActions.showToastMessage(err.message, 'error'));
  }
};

export const contactActions = {
  createContact,
  getContactsByUser,
};
