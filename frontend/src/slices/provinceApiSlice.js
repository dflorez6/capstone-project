//====================
// Slices (from Redux Toolkit) are a way to organize reducers, actions, and selectors into one file.
//====================
// Dependencies
import { apiSlice } from "./apiSlice";

const PROVINCES_URL = "/api/v1/provinces";

export const provincesApiSlice = apiSlice.injectEndpoints({
  // Endpoints
  endpoints: (builder) => ({
    // Index - Get All Provinces
    getProvinces: builder.query({
      query: () => ({
        url: PROVINCES_URL,
        method: "GET",
      }),
    }),

    // Add API Endpoint
  }),
});

export const { useGetProvincesQuery } = provincesApiSlice; // Export hooks for usage in components
