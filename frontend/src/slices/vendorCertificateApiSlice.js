//====================
// Slices (from Redux Toolkit) are a way to organize reducers, actions, and selectors into one file.
//====================
// Dependencies
import { apiSlice } from "./apiSlice";

const VENDOR_CERTIFICATES_URL = "/api/v1/vendor-certificates";

export const vendorCertificateApiSlice = apiSlice.injectEndpoints({
  // Endpoints
  endpoints: (builder) => ({
    // Index - Get All Vendor Certificates
    getVendorCertificates: builder.query({
      query: (vendorStore) => ({
        url: `${VENDOR_CERTIFICATES_URL}/${vendorStore}`,
        method: "GET",
      }),
    }),

    // Show - Get Vendor Certificate by :vendorStore & :certificateId
    getVendorCertificate: builder.query({
      query: ({ vendorStore, certificateId }) => ({
        url: `${VENDOR_CERTIFICATES_URL}/${vendorStore}/${certificateId}`,
        method: "GET",
      }),
    }),

    // Create Vendor Certificate
    createVendorCertificate: builder.mutation({
      query: (data) => ({
        url: `${VENDOR_CERTIFICATES_URL}`,
        method: "POST",
        body: data,
      }),
    }),

    // Update Vendor Certificate
    updateVendorCertificate: builder.mutation({
      query: ({ vendorStore, certificateId, data }) => ({
        url: `${VENDOR_CERTIFICATES_URL}/${vendorStore}/${certificateId}`,
        method: "PUT",
        body: data,
      }),
    }),

    // Delete Vendor Certificate
    deleteVendorCertificate: builder.mutation({
      query: ({ vendorStore, certificateId }) => ({
        url: `${VENDOR_CERTIFICATES_URL}/${vendorStore}/${certificateId}`,
        method: "DELETE",
      }),
    }),

    // Add API Endpoint
  }),
});

export const {
  useGetVendorCertificatesQuery,
  useGetVendorCertificateQuery,
  useCreateVendorCertificateMutation,
  useUpdateVendorCertificateMutation,
  useDeleteVendorCertificateMutation,
} = vendorCertificateApiSlice; // Export hooks for usage in components
