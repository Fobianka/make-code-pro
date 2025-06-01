import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type CommentType = {
  userName: string;
  userText: string;
  productId: number;
  date: string;
  id?: number;
};

export const commentsApi = createApi({
  reducerPath: 'commentsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
  tagTypes: ['Comment'],
  endpoints: (builder) => ({
    getComments: builder.query<CommentType[], number>({
      query: (id) => `/comments?productId=${id}`,
      providesTags: () => [{ type: 'Comment', id: 'LIST' }],
    }),
    addComment: builder.mutation<void, CommentType>({
      query: (comment) => ({
        url: `comments`,
        method: 'POST',
        body: comment,
      }),
      invalidatesTags: [{ type: 'Comment', id: 'LIST' }],
    }),
  }),
});

export const { useGetCommentsQuery, useAddCommentMutation } = commentsApi;
