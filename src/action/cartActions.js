import api from '../utils/api';
import * as types from '../constants/cart.constants';
import { commonUiActions } from './commonUiAction';

export const setDeliveryAddress = (address) => ({
  type: types.SET_DELIVERY_ADDRESS,
  payload: address,
});

// 장바구니 아이템 추가.
const addToCart = (book, quantity, deliveryAddress) => async (dispatch) => {
  try {
    dispatch({ type: types.ADD_TO_CART_REQUEST });
    const response = await api.post('/cart', { bookId: book._id, qty: quantity, deliveryAddress });
    if (response.status !== 200) throw new Error(response.error);
    dispatch({ type: types.ADD_TO_CART_SUCCESS, payload: response.data });
    dispatch(setDeliveryAddress(deliveryAddress)); // 주소를 리듀서에 저장
    dispatch(commonUiActions.showToastMessage(`${quantity}개의 책이 장바구니에 담겼습니다.`, 'success'));
  } catch (error) {
    dispatch({ type: types.ADD_TO_CART_FAIL, payload: error.message });
  }
};

// 장바구니 아이템 조회.
const getCartList = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_CART_LIST_REQUEST });
    const response = await api.get('/cart');
    if (response.status !== 200) throw new Error(response.error);
    dispatch({ type: types.GET_CART_LIST_SUCCESS, payload: response.data.data });
  } catch (error) {
    dispatch({ type: types.GET_CART_LIST_FAIL, payload: error.message });
  }
};

// 장바구니 아이템 삭제.
const deleteCartItem = (id, qty) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_CART_ITEM_REQUEST });
    const response = await api.delete(`/cart/${id}`);
    if (response.status !== 200) throw new Error(response.error);

    dispatch({
      type: types.DELETE_CART_ITEM_SUCCESS,
      payload: response.data.cartItemQty,
    });
    dispatch(commonUiActions.showToastMessage(`${qty}개의 도서가 삭제되었습니다.`, 'success'));
    dispatch(getCartList());
  } catch (error) {
    dispatch({ type: types.DELETE_CART_ITEM_FAIL, payload: error });
    dispatch(commonUiActions.showToastMessage(error, 'error'));
  }
};

// 장바구니 아이템 아이템 수량 수정.
const updateItemQty = (id, value) => async (dispatch) => {
  try {
    dispatch({ type: types.UPDATE_CART_ITEM_REQUEST });
    const response = await api.put(`/cart/${id}`, { qty: value });
    if (response.status !== 200) throw new Error(response.error);

    dispatch({
      type: types.UPDATE_CART_ITEM_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({ type: types.UPDATE_CART_ITEM_FAIL, payload: error });
    dispatch(commonUiActions.showToastMessage(error, 'error'));
  }
};

// 장바구니에 담긴 아이템 갯수.
const getCartQty = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_CART_QTY_REQUEST });
    const response = await api.get('/cart/qty');
    if (response.status !== 200) throw new Error(response.error);
    dispatch({ type: types.GET_CART_QTY_SUCCESS, payload: response.data.qty });
  } catch (error) {
    dispatch({ type: types.GET_CART_QTY_FAIL, payload: error });
  }
};

export const cartActions = {
  addToCart,
  getCartList,
  deleteCartItem,
  updateItemQty,
  getCartQty,
};
