import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../constants";
import { PARKING_TICKETS_URL } from "../constants";
import { OWNERS_URL } from "../constants";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),

    signup: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),

    profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),

    getUsers: builder.query({
      query: () => ({
        url: USERS_URL,
      }),
    }),
    getOwners: builder.query({
      query: () => ({
        url: OWNERS_URL,
      }),
    }),

    createParkingTicket: builder.mutation({
      query: (data) => ({
        url: `${PARKING_TICKETS_URL}/create`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
  useProfileMutation,
  useGetUsersQuery,
  useGetOwnersQuery,
  useCreateParkingTicketMutation,
} = userApiSlice;
