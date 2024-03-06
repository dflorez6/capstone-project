//====================
// Slices (from Redux Toolkit) are a way to organize reducers, actions, and selectors into one file.
//====================
// Dependencies
import { apiSlice } from "./apiSlice";

const VENDOR_SERVICES_URL = "/api/v1/vendor-services";

export const vendorServiceApiSlice = apiSlice.injectEndpoints({
  // Endpoints
  endpoints: (builder) => ({
    // Index - Get All Vendor Services
    getVendorServices: builder.query({
      query: (vendorStore) => ({
        url: `${VENDOR_SERVICES_URL}/${vendorStore}`,
        method: "GET",
      }),
    }),

    // Show - Get Vendor Service by :vendorStore & :serviceId
    getVendorService: builder.query({
      query: ({ vendorStore, serviceId }) => ({
        url: `${VENDOR_SERVICES_URL}/${vendorStore}/${serviceId}`,
        method: "GET",
      }),
    }),

    // Create Vendor Service
    createVendorService: builder.mutation({
      query: (data) => ({
        url: `${VENDOR_SERVICES_URL}`,
        method: "POST",
        body: data,
      }),
    }),

    // Update Vendor Service
    updateVendorService: builder.mutation({
      query: ({ vendorStore, serviceId, data }) => ({
        url: `${VENDOR_SERVICES_URL}/${vendorStore}/${serviceId}`,
        method: "PUT",
        body: data,
      }),
    }),

    // Delete Vendor Service
    deleteVendorService: builder.mutation({
      query: ({ vendorStore, serviceId }) => ({
        url: `${VENDOR_SERVICES_URL}/${vendorStore}/${serviceId}`,
        method: "DELETE",
      }),
    }),

    // Add API Endpoint
  }),
});

export const {
  useGetVendorServicesQuery,
  useGetVendorServiceQuery,
  useCreateVendorServiceMutation,
  useUpdateVendorServiceMutation,
  useDeleteVendorServiceMutation,
} = vendorServiceApiSlice; // Export hooks for usage in components
