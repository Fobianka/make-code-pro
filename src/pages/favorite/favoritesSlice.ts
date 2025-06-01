import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProductType } from '../../types';
import { AppDispatch } from '../../store';

export const fetchFavorites = createAsyncThunk<ProductType[]>(
  'products/fetchFavorites',
  async () => {
    const response = await fetch(`http://localhost:5000/favorites`);
    const result = await response.json();

    return result;
  }
);

export const addToFavorites = createAsyncThunk<
  void,
  ProductType,
  { dispatch: AppDispatch }
>('products/addToFavorites', async (product, thunkAPI) => {
  await fetch(`http://localhost:5000/favorites`, {
    method: 'POST',
    body: JSON.stringify(product),
    headers: { 'Content-Type': 'application/json' },
  });

  thunkAPI.dispatch(fetchFavorites());
});

export const deleteFavorite = createAsyncThunk<
  void,
  number,
  { dispatch: AppDispatch }
>('products/deleteFavorite', async (id, thunkAPI) => {
  await fetch(`http://localhost:5000/favorites/${id}`, {
    method: 'DELETE',
  });

  thunkAPI.dispatch(fetchFavorites());
});

type InitialStateType = {
  favorites: ProductType[];
  favoritesLoading: boolean;
  favoritesError: string;
};

const initialState: InitialStateType = {
  favoritesLoading: false,
  favoritesError: '',
  favorites: [],
};

export const favoritesSlice = createSlice({
  name: 'favoritesSlice',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchFavorites.pending, (state, action) => {
      state.favoritesLoading = true;
    });
    builder.addCase(fetchFavorites.fulfilled, (state, action) => {
      state.favoritesLoading = false;

      state.favorites = action.payload;
    });
    builder.addCase(fetchFavorites.rejected, (state, action) => {
      state.favoritesLoading = false;
      state.favoritesError = 'error';
    });
  },
  reducers: {},
});

export default favoritesSlice.reducer;
