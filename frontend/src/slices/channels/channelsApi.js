import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import PAGEPATH from '../../helpers/pagePath';
import socket from '../../socket';

export const channelsApi = createApi({
  reducerPath: 'channelsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: PAGEPATH.BASECHANNEL,
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().auth;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Channels'],
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => '',
      providesTags: ['Channels'],
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
      ) {
        await cacheDataLoaded;

        const newChannelListener = (channel) => {
          updateCachedData((draft) => {
            draft.push(channel);
          });
        };

        const updateChannelListener = ({ id, name }) => {
          updateCachedData((draft) => {
            const channel = draft.find((el) => el.id === id);
            if (channel) {
              channel.name = name;
            }
          });
        };

        const removeChannelListener = (id) => {
          updateCachedData((draft) => {
            const index = draft.findIndex((el) => el.id === id);
            if (index !== -1) {
              draft.splice(index, 1);
            }
          });
        };

        socket.on('newChannel', newChannelListener);
        socket.on('renameChannel', updateChannelListener);
        socket.on('removeChannel', removeChannelListener);

        await cacheEntryRemoved;

        socket.off('newChannel', newChannelListener);
        socket.off('renameChannel', updateChannelListener);
        socket.off('removeChannel', removeChannelListener);
      },
    }),
    addChannel: builder.mutation({
      query: (newChannel) => ({
        url: '',
        method: 'POST',
        body: newChannel,
      }),
      invalidatesTags: ['Channels'],
    }),
    updateChannel: builder.mutation({
      query: ({ id, newName }) => ({
        url: id,
        method: 'PATCH',
        body: newName,
      }),
      invalidatesTags: ['Channels'],
    }),
    removeChannel: builder.mutation({
      query: (id) => ({
        url: id,
        method: 'DELETE',
      }),
      invalidatesTags: ['Channels'],
    }),
  }),
});

export const {
  useGetChannelsQuery,
  useAddChannelMutation,
  useUpdateChannelMutation,
  useRemoveChannelMutation,
} = channelsApi;
