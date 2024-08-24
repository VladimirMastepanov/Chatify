import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import PAGEPATH from '../../helpers/pagePath';
import socket from '../../socket';

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: PAGEPATH.BASEMESSAGE,
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().auth;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Channel', 'Message'],
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => '',
      providesTags: ['Channels', 'Message'],
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
      ) {
        await cacheDataLoaded;

        const newMessageListener = (newMessage) => {
          updateCachedData((draft) => {
            draft.push(newMessage);
          });
        };

        socket.on('newMessage', newMessageListener);

        await cacheEntryRemoved;

        socket.off('newMessage', newMessageListener);
      },
    }),
    addMessage: builder.mutation({
      query: (newMessage) => ({
        url: '',
        method: 'POST',
        body: newMessage,
      }),
      invalidatesTags: ['Message'],
    }),
    updateMessage: builder.mutation({
      query: ({ id, newBody }) => ({
        url: id,
        method: 'PATCH',
        body: newBody,
      }),
      invalidatesTags: ['Message'],
    }),
    removeMessage: builder.mutation({
      query: (id) => ({
        url: id,
        method: 'DELETE',
      }),
      invalidatesTags: ['Message'],
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useAddMessageMutation,
} = messagesApi;
