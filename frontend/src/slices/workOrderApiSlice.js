//====================
// Slices (from Redux Toolkit) are a way to organize reducers, actions, and selectors into one file.
//====================
// Dependencies
import { apiSlice } from "./apiSlice";

const WORK_ORDERS_URL = "/api/v1/work-orders";

export const workOrderApiSlice = apiSlice.injectEndpoints({
  // Endpoints
  endpoints: (builder) => ({
    // Index - Get Property Manger Project Work Orders
    getPropertyManagerProjectWorkOrders: builder.query({
      query: ({ propertyManagerId, projectId }) => ({
        url: `${WORK_ORDERS_URL}/property-manager/${propertyManagerId}/project/${projectId}`,
        method: "GET",
      }),
    }),

    // Index - Get Vendor Project Work Orders
    getVendorProjectWorkOrders: builder.query({
      query: ({ vendorId, projectId }) => ({
        url: `${WORK_ORDERS_URL}/vendor/${vendorId}/project/${projectId}`,
        method: "GET",
      }),
    }),

    // Index - Get All Property Manger Work Orders
    getAllPropertyManagerWorkOrders: builder.query({
      query: ({ propertyManagerId }) => ({
        url: `${WORK_ORDERS_URL}/property-manager/all/${propertyManagerId}`,
        method: "GET",
      }),
    }),

    // Index - Get All Vendor Work Orders
    getAllVendorWorkOrders: builder.query({
      query: ({ vendorId }) => ({
        url: `${WORK_ORDERS_URL}/vendor/${vendorId}`,
        method: "GET",
      }),
    }),

    // Show - Get Work Order (Accessible by Property Manager)
    getPropertyManagerWorkOrder: builder.query({
      query: (workOrderId) => ({
        url: `${WORK_ORDERS_URL}/property-manager/order/${workOrderId}`,
        method: "GET",
      }),
    }),
    
    // showVendorWorkOrder: GET /api/v1/work-orders/vendor/:workOrderId
    getVendorWorkOrder: builder.query({
      query: (workOrderId) => ({
        url: `${WORK_ORDERS_URL}/vendor/order/${workOrderId}`,
        method: "GET",
      }),
    }),

    // Create - Work Order
    createWorkOrder: builder.mutation({
      query: ({ projectId, data }) => ({
        url: `${WORK_ORDERS_URL}/property-manager/${projectId}`,
        method: "POST",
        body: data,
      }),
    }),

    // Update - Update Work Order by Property Manager
    updateWorkOrder: builder.mutation({
      query: ({ projectId, workOrderId, data }) => ({
        url: `${WORK_ORDERS_URL}/property-manager/${projectId}/${workOrderId}`,
        method: "PUT",
        body: data,
      }),
    }),

    // Update - Mark Work Order as Accepted by Vendor
    vendorAcceptWorkOrder: builder.mutation({
      query: ({ projectId, workOrderId }) => ({
        url: `${WORK_ORDERS_URL}/vendor/accept/${projectId}/${workOrderId}`,
        method: "PUT",
      }),
    }),

    // Update - Mark Work Order as Accepted by Property Manager
    propertyManagerAcceptWorkOrder: builder.mutation({
      query: ({ projectId, workOrderId }) => ({
        url: `${WORK_ORDERS_URL}/property-manager/accept/${projectId}/${workOrderId}`,
        method: "PUT",
      }),
    }),

    // Update - Vendor Reschedule Work Order
    vendorRescheduleWorkOrder: builder.mutation({
      query: ({ projectId, workOrderId, data }) => ({
        url: `${WORK_ORDERS_URL}/vendor/reschedule/${projectId}/${workOrderId}`,
        method: "PUT",
        body: data,
      }),
    }),

    // Update - Property Manager Reschedule Work Order
    propertyManagerRescheduleWorkOrder: builder.mutation({
      query: ({ projectId, workOrderId, data }) => ({
        url: `${WORK_ORDERS_URL}/property-manager/reschedule/${projectId}/${workOrderId}`,
        method: "PUT",
        body: data,
      }),
    }),

    // Update - Property Manager Close Work Order
    propertyManagerCloseWorkOrder: builder.mutation({
      query: ({ projectId, workOrderId, data }) => ({
        url: `${WORK_ORDERS_URL}/property-manager/close/${projectId}/${workOrderId}`,
        method: "PUT",
        body: data,
      }),
    }),

    // deleteWorkOrder: DELETE /api/v1/work-orders/property-manager/:projectId/:workOrderId

    /*
    // Delete - Vendor Notification
    deleteVendorNotification: builder.mutation({
      query: ({ vendorId, notificationId }) => ({
        url: `${WORK_ORDERS_URL}/vendor/${vendorId}/${notificationId}`,
        method: "DELETE",
      }),
    }),
    */

    // Add API Endpoint
  }),
});

export const {
  // Index
  useGetPropertyManagerProjectWorkOrdersQuery,
  useGetVendorProjectWorkOrdersQuery,
  useGetAllPropertyManagerWorkOrdersQuery,
  useGetAllVendorWorkOrdersQuery,
  // Show
  useGetPropertyManagerWorkOrderQuery,
  useGetVendorWorkOrderQuery,
  // Create
  useCreateWorkOrderMutation,
  // Update
  useUpdateWorkOrderMutation,
  useVendorAcceptWorkOrderMutation,
  usePropertyManagerAcceptWorkOrderMutation,
  useVendorRescheduleWorkOrderMutation,
  usePropertyManagerRescheduleWorkOrderMutation,
  usePropertyManagerCloseWorkOrderMutation,
  // Delete
} = workOrderApiSlice; // Export hooks for usage in components
