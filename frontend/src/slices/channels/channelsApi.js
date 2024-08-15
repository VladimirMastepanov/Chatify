import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const channelsApi = createApi({
  reducerPath: 'channelsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1',
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().auth;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => 'channels',
    }),
    addChannel: builder.mutation({
      query: (newChannel) => ({
        url: 'channels',
        method: 'POST',
        body: newChannel,
      }),
    }),
    updateChannel: builder.mutation({
      query: ({ id, newName }) => ({
        url: `channels/${id}`,
        method: 'PATCH',
        body: newName,
      }),
    }),
    removeChannel: builder.mutation({
      query: (id) => ({
        url: `channel/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetChannelsQuery,
  useAddChannelMutation,
  useUpdateChannelMutation,
  useRemoveChannelMutation,
} = channelsApi;
