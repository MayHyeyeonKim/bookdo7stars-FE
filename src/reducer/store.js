import { configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from '@redux-devtools/extension';
import bookReducer from './bookReducer';
import orderReducer from './orderReducer';
import userReducer from './userReducer';
import cartReducer from './cartReducer';
import favoriteReducer from './favoriteReducer';
import categoryReducer from './categoryReducer';
import commonUiReducer from './commonUIReducer';
import commentReducer from './commentReducer';
import contactReducer from './contactReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    book: bookReducer,
    order: orderReducer,
    cart: cartReducer,
    comment: commentReducer,
    favorite: favoriteReducer,
    ui: commonUiReducer,
    category: categoryReducer,
    contact: contactReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false, // ImmutableStateInvariantMiddleware 비활성화
      serializableCheck: false,
    }),
});

export default store;

// import { configureStore } from '@reduxjs/toolkit';

// const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       immutableCheck: false, // ImmutableStateInvariantMiddleware 비활성화
//       serializableCheck: false,
//     }),
// });
