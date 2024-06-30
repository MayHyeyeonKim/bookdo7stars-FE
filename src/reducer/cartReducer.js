import * as types from '../constants/cart.constants';
import { USER_LOGOUT } from '../constants/user.constants';

const initialState = {
  loading: false,
  error: '',
  cartList: [],
  selectedItem: {},
  cartItemCount: 0,
  totalPrice: 0,
  user: {},
  quantity: 1,
  addToCartDone: false,
  deliveryAddress: '',
};

function cartReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOGOUT: {
      return {
        ...state,
        cartItemCount: 0,
        cartList: [],
        totalPrice: 0,
      };
    }
    case types.ADD_TO_CART_REQUEST:
    case types.GET_CART_LIST_REQUEST:
    case types.DELETE_CART_ITEM_REQUEST:
    case types.UPDATE_CART_ITEM_REQUEST:
    case types.GET_CART_QTY_REQUEST:
      return { ...state, loading: true };

    case types.DELETE_CART_ITEM_SUCCESS:
      return {
        ...state,
        loading: true,
        cartItemCount: payload,
      };
    case types.UPDATE_CART_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        cartList: payload,
        totalPrice: payload.reduce((total, item) => (total += item.bookId.priceSales * item.qty), 0),
      };

    case types.GET_CART_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        cartList: payload.items,
        user: payload.user,
        totalPrice: payload.items.reduce((total, item) => total + item.bookId.priceSales * item.qty, 0),
      };
    case types.GET_CART_QTY_SUCCESS:
      return {
        ...state,
        cartItemCount: payload,
      };

    case types.ADD_TO_CART_SUCCESS:
      return { ...state, loading: false, addToCartDone: true, cartList: [...state.cartList, payload.data], cartItemCount: payload.cartItemQty };

    case types.GET_CART_LIST_FAIL:
    case types.DELETE_CART_ITEM_FAIL:
    case types.UPDATE_CART_ITEM_FAIL:
    case types.GET_CART_QTY_FAIL:
      return { ...state, loading: false, error: payload };

    case types.SET_QUANTITY:
      return { ...state, quantity: payload };

    case types.SET_DELIVERY_ADDRESS:
      return { ...state, deliveryAddress: payload };
    default:
      return state;
  }
}

export default cartReducer;
