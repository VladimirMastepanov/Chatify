import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
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
