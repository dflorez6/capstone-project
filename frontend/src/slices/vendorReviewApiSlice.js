//====================
// Slices (from Redux Toolkit) are a way to organize reducers, actions, and selectors into one file.
//====================
// Dependencies
import { apiSlice } from "./apiSlice";

const VENDOR_REVIEWS_URL = "/api/v1/vendor-reviews";

export const vendorRatingApiSlice = apiSlice.injectEndpoints({
  // Endpoints
  endpoints: (builder) => ({
    // Index - Get the average ratings for a vendor
    getVendorReviews: builder.query({
      query: (storeSlug) => ({
        url: `${VENDOR_REVIEWS_URL}/${storeSlug}`,
        method: "GET",
      }),
    }),

    // Create - Work Order
    createVendorReview: builder.mutation({
      query: (data) => ({
        url: `${VENDOR_REVIEWS_URL}`,
        method: "POST",
        body: data,
      }),
    }),

    // Add API Endpoint
  }),
});

export const { useGetVendorReviewsQuery, useCreateVendorReviewMutation } =
  vendorRatingApiSlice; // Export hooks for usage in components
