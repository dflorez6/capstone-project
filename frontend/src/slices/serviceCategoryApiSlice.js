//====================
// Slices (from Redux Toolkit) are a way to organize reducers, actions, and selectors into one file.
//====================
// Dependencies
import { apiSlice } from "./apiSlice";

const SERVICE_CATEGORIES_URL = "/api/v1/service-categories";

export const serviceCategoryApiSlice = apiSlice.injectEndpoints({
  // Endpoints
  endpoints: (builder) => ({
    // Index - Get All Service Categories
    getServiceCategories: builder.query({
      query: () => ({
        url: SERVICE_CATEGORIES_URL,
        method: "GET",
      }),
    }),

    // Add API Endpoint
  }),
});

export const { useGetServiceCategoriesQuery } = serviceCategoryApiSlice; // Export hooks for usage in components
