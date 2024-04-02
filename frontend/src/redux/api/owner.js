import { apiSlice } from "./apiSlice";
import { OWNERS_URL } from "../constants"; // Assuming you have a constant for the owners' API URL

export const ownerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: `${OWNERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    // Add more endpoints for owner operations as needed
  }),
});

export const { useRegisterMutation } = ownerApiSlice;
