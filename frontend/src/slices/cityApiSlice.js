//====================
// Slices (from Redux Toolkit) are a way to organize reducers, actions, and selectors into one file.
//====================
// Dependencies
import { apiSlice } from "./apiSlice";

const CITIES_URL = "/api/v1/cities";

export const citiesApiSlice = apiSlice.injectEndpoints({
  // Endpoints
  endpoints: (builder) => ({
    // Index - Get All Cities
    getCities: builder.query({
      query: () => ({
        url: CITIES_URL,
        method: "GET",
      }),
    }),

    // Add API Endpoint
  }),
});

export const { useGetCitiesQuery } = citiesApiSlice; // Export hooks for usage in components
