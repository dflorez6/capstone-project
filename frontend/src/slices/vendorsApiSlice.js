//====================
// Slices (from Redux Toolkit) are a way to organize reducers, actions, and selectors into one file.
//====================
// Dependencies
import { apiSlice } from "./apiSlice";

const VENDORS_URL = "/api/v1/vendors";

export const vendorsApiSlice = apiSlice.injectEndpoints({
  // Endpoints
  endpoints: (builder) => ({
    // Login
    login: builder.mutation({
      query: (data) => ({
        url: `${VENDORS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),

    // Logout
    logout: builder.mutation({
      query: () => ({
        url: `${VENDORS_URL}/logout`,
        method: "POST",
      }),
    }),

    // Register
    register: builder.mutation({
      query: (data) => ({
        url: `${VENDORS_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),

    // Update Profile
    updateVendor: builder.mutation({
      query: (data) => ({
        url: `${VENDORS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),

    // Route
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateVendorMutation,
} = vendorsApiSlice; // Export hooks for usage in components
