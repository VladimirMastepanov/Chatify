import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import PAGEPATH from '../../helpers/pagePath';

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
    }),
    addChannel: builder.mutation({
      query: (newChannel) => ({
        url: '',
        method: 'POST',
        body: newChannel,
      }),
    }),
    updateChannel: builder.mutation({
      query: ({ id, newName }) => ({
        url: id,
        method: 'PATCH',
        body: newName,
      }),
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
