import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/messages',
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().auth;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => '',
    }),
    addMessage: builder.mutation({
      query: (newMessage) => ({
        url: '',
        method: 'POST',
        body: newMessage,
      }),
    }),
    updateMessage: builder.mutation({
      query: ({ id, newBody }) => ({
        url: id,
        method: 'PATCH',
        body: newBody,
      }),
    }),
    removeMessage: builder.mutation({
      query: (id) => ({
        url: id,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useAddMessageMutation,
} = messagesApi;
