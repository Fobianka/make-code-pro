import { configureStore } from '@reduxjs/toolkit';

import favoritesReducer from './pages/favorite/favoritesSlice';
import productsReducer from './pages/main/productsSlice';
import cartReducer from './pages/cart/cartSlice';
import productReducer from './pages/product/productSlice';
import userReducer from './components/Login/registrationSlice';
import { brandsApi } from './queries/brandsApi';
import { commentsApi } from './queries/commentsApi';

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    products: productsReducer,
    cart: cartReducer,
    product: productReducer,
    user: userReducer,
    [brandsApi.reducerPath]: brandsApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(brandsApi.middleware, commentsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
