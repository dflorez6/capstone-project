//====================
// Slices (from Redux Toolkit) are a way to organize reducers, actions, and selectors into one file.
//====================
// Dependencies
import { apiSlice } from "./apiSlice";

const VENDOR_RATINGS_URL = "/api/v1/vendor-ratings";

export const vendorRatingApiSlice = apiSlice.injectEndpoints({
  // Endpoints
  endpoints: (builder) => ({
    // Index - Get the average ratings for a vendor
    getVendorAverageRatings: builder.query({
      query: (vendorId) => ({
        url: `${VENDOR_RATINGS_URL}/${vendorId}`,
        method: "GET",
      }),
    }),

    // Create - Work Order
    createVendorRating: builder.mutation({
      query: (data) => ({
        url: `${VENDOR_RATINGS_URL}`,
        method: "POST",
        body: data,
      }),
    }),

    // Add API Endpoint
  }),
});

export const {
  useGetVendorAverageRatingsQuery,
  useCreateVendorRatingMutation,
} = vendorRatingApiSlice; // Export hooks for usage in components
