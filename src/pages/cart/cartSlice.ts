import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProductType } from '../../types';
import { AppDispatch } from '../../store';

export const loadCart = createAsyncThunk<ProductType[]>(
  'products/loadCart',
  async () => {
    const response = await fetch(`http://localhost:5000/cart`);
    const result = await response.json();

    return result;
  }
);

export const addToCart = createAsyncThunk<
  void,
  ProductType,
  { dispatch: AppDispatch }
>('products/addToCart', async (product, thunkAPI) => {
  await fetch(`http://localhost:5000/cart`, {
    method: 'POST',
    body: JSON.stringify(product),
    headers: { 'Content-Type': 'application/json' },
  });

  thunkAPI.dispatch(loadCart());
});

export const deleteFromCart = createAsyncThunk<
  void,
  number,
  { dispatch: AppDispatch }
>('products/deleteFromCart', async (id, thunkAPI) => {
  await fetch(`http://localhost:5000/cart/${id}`, {
    method: 'DELETE',
  });

  thunkAPI.dispatch(loadCart());
});

export const updateProductCart = createAsyncThunk<
  void,
  ProductType,
  { dispatch: AppDispatch }
>('products/updateProductCart', async (updatedProduct, thunkAPI) => {
  await fetch(`http://localhost:5000/cart/${updatedProduct.id}`, {
    method: 'PUT',
    body: JSON.stringify(updatedProduct),
    headers: { 'Content-Type': 'application/json' },
  });

  thunkAPI.dispatch(loadCart());
});

type InitialStateType = {
  cart: ProductType[];
};

const initialState: InitialStateType = {
  cart: [],
};

export const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(loadCart.pending, (state, action) => {});
    builder.addCase(loadCart.fulfilled, (state, action) => {
      state.cart = action.payload;
    });
    builder.addCase(loadCart.rejected, (state, action) => {});
  },
  reducers: {},
});

export default cartSlice.reducer;
