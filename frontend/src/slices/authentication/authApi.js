import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import PAGEPATH from '../../helpers/pagePath';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: PAGEPATH.BASE }),
  endpoints: (builder) => ({
    fetchAuth: builder.mutation({
      query: (authValues) => ({
        url: 'login',
        method: 'POST',
        body: authValues,
      }),
    }),
    fetchSignUp: builder.mutation({
      query: (signUpValues) => ({
        url: 'signup',
        method: 'POST',
        body: signUpValues,
      }),
    }),
  }),
});

export const {
  useFetchAuthMutation,
  useFetchSignUpMutation,
} = authApi;
