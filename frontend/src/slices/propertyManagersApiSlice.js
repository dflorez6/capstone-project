//====================
// Slices (from Redux Toolkit) are a way to organize reducers, actions, and selectors into one file.
//====================
// Dependencies
import { apiSlice } from "./apiSlice";

const PROPERTY_MANAGERS_URL = "/api/v1/property-managers";

export const propertyManagersApiSlice = apiSlice.injectEndpoints({
  // Endpoints
  endpoints: (builder) => ({
    // Login
    propertyManagerLogin: builder.mutation({
      query: (data) => ({
        url: `${PROPERTY_MANAGERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),

    // Logout
    propertyManagerLogout: builder.mutation({
      query: () => ({
        url: `${PROPERTY_MANAGERS_URL}/logout`,
        method: "POST",
      }),
    }),

    // Register
    propertyManagerRegister: builder.mutation({
      query: (data) => ({
        url: `${PROPERTY_MANAGERS_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),

    // Update Profile
    updatePropertyManager: builder.mutation({
      query: (data) => ({
        url: `${PROPERTY_MANAGERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),

    // Route
  }),
});

export const {
  usePropertyManagerLoginMutation,
  usePropertyManagerLogoutMutation,
  usePropertyManagerRegisterMutation,
  useUpdatePropertyManagerMutation,
} = propertyManagersApiSlice; // Export hooks for usage in components
