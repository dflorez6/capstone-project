//====================
// Slices (from Redux Toolkit) are a way to organize reducers, actions, and selectors into one file.
//====================
// Dependencies
import { apiSlice } from "./apiSlice";

const CERTIFICATE_CATEGORIES_URL = "/api/v1/certificate-categories";

export const certificateCategoryApiSlice = apiSlice.injectEndpoints({
  // Endpoints
  endpoints: (builder) => ({
    // Index - Get All Service Categories
    getCertificateCategories: builder.query({
      query: () => ({
        url: CERTIFICATE_CATEGORIES_URL,
        method: "GET",
      }),
    }),

    // Add API Endpoint
  }),
});

export const { useGetCertificateCategoriesQuery } = certificateCategoryApiSlice; // Export hooks for usage in components
