//====================
// Slices (from Redux Toolkit) are a way to organize reducers, actions, and selectors into one file.
//====================
// Dependencies
import { apiSlice } from "./apiSlice";

const WORK_ORDER_LOGS_URL = "/api/v1/work-orders";

export const workOrderLogApiSlice = apiSlice.injectEndpoints({
  // Endpoints
  endpoints: (builder) => ({
    // Index - Get Property Manger Project Work Orders
    getPropertyManagerWorkOrderLogs: builder.query({
      query: (workOrderId) => ({
        url: `${WORK_ORDER_LOGS_URL}/property-manager/logs/${workOrderId}`,
        method: "GET",
      }),
    }),

    // Index - Get Vendor Project Work Orders
    getVendorWorkOrderLogs: builder.query({
      query: (workOrderId) => ({
        url: `${WORK_ORDER_LOGS_URL}/vendor/logs/${workOrderId}`,
        method: "GET",
      }),
    }),

    // Create - Work Order
    createVendorWorkOrderLogs: builder.mutation({
      query: ({data}) => ({
        url: `${WORK_ORDER_LOGS_URL}/vendor/logs`,
        method: "POST",
        body: data,
      }),
    }),

    // Add API Endpoint
  }),
});

export const {
  useGetPropertyManagerWorkOrderLogsQuery,
  useGetVendorWorkOrderLogsQuery,
  useCreateVendorWorkOrderLogsMutation,
} = workOrderLogApiSlice; // Export hooks for usage in components
