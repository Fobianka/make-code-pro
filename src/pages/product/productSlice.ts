import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProductType } from '../../types';

export const loadProduct = createAsyncThunk<ProductType, string>(
  'products/loadProduct',
  async (id) => {
    const response = await fetch(`http://localhost:5000/products/${id}`);
    const result = await response.json();

    return result;
  }
);

// type CommentType = {
//   userName: string;
//   userText: string;
//   productId: number;
//   date: string;
//   id?: number;
// };

// export const loadComments = createAsyncThunk<CommentType[], number>(
//   'products/loadComments',
//   async (id) => {
//     const result = await fetch(
//       `http://localhost:5000/comments?productId=${id}`
//     );
//     const data = await result.json();

//     return data;
//   }
// );

export const createProduct = createAsyncThunk<void, ProductType>(
  'products/createProduct',
  async (product) => {
    await fetch(`http://localhost:5000/products`, {
      method: 'POST',
      body: JSON.stringify(product),
      headers: { 'Content-Type': 'application/json' },
    });
  }
);

// export const createComment = createAsyncThunk<void, CommentType>(
//   'products/createComment',
//   async (comment, thunkAPI) => {
//     await fetch(`http://localhost:5000/comments`, {
//       method: 'POST',
//       body: JSON.stringify(comment),
//       headers: { 'Content-Type': 'application/json' },
//     });
//     thunkAPI.dispatch(loadComments(comment.productId));
//   }
// );

type InitialStateType = {
  product: ProductType | null;
  // comments: CommentType[];
};

const initialState: InitialStateType = {
  product: null,
  // comments: [],
};

export const productSlice = createSlice({
  name: 'productSlice',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(loadProduct.pending, (state, action) => {});
    builder.addCase(loadProduct.fulfilled, (state, action) => {
      state.product = action.payload;
    });
    // builder.addCase(loadComments.fulfilled, (state, action) => {
    //   state.comments = action.payload;
    // });
    // builder.addCase(loadProduct.rejected, (state, action) => {});
  },
  reducers: {},
});

export default productSlice.reducer;
