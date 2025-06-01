import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { ProductType } from '../types';

export const brandsApi = createApi({
  reducerPath: 'brandsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
  endpoints: (builder) => ({
    getBrands: builder.query<string[], void>({
      query: () => `/brands`,
    }),
    getProduct: builder.query<ProductType, string>({
      query: (id) => `/products/${id}`,
    }),
  }),
});

export const { useGetBrandsQuery, useGetProductQuery } = brandsApi;
