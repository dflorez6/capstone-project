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
    vendorLogin: builder.mutation({
      query: (data) => ({
        url: `${VENDORS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),

    // Logout
    vendorLogout: builder.mutation({
      query: () => ({
        url: `${VENDORS_URL}/logout`,
        method: "POST",
      }),
    }),

    // Register
    vendorRegister: builder.mutation({
      query: (data) => ({
        url: `${VENDORS_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),

    showVendor: builder.query({
      query: () => ({
        url: `${VENDORS_URL}/profile`,
        method: "GET",
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
  useVendorLoginMutation,
  useVendorLogoutMutation,
  useVendorRegisterMutation,
  useShowVendorQuery,
  useUpdateVendorMutation,
} = vendorsApiSlice; // Export hooks for usage in components
