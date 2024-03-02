//====================
// Slices (from Redux Toolkit) are a way to organize reducers, actions, and selectors into one file.
//====================
// Dependencies
import { apiSlice } from "./apiSlice";

const VENDOR_STORES_URL = "/api/v1/vendor-stores";

export const vendorStoreApiSlice = apiSlice.injectEndpoints({
  // Endpoints
  endpoints: (builder) => ({
    // Index - Get All Vendor Stores
    getVendorStores: builder.query({
      query: () => ({
        url: VENDOR_STORES_URL,
        method: "GET",
      }),
    }),

    // Show - Get Vendor Store by :storeSlug
    getVendorStore: builder.query({
      query: (storeSlug) => ({
        url: `${VENDOR_STORES_URL}/${storeSlug}`,
        method: "GET",
      }),
    }),

    // TODO: Update Store 

    // Add API Endpoint
  }),
});

export const { useGetVendorStoresQuery, useGetVendorStoreQuery } =
  vendorStoreApiSlice; // Export hooks for usage in components
