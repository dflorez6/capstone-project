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

    // showPropertyManagerWorkOrder: GET /api/v1/work-orders/property-manager/:workOrderId
    getPropertyManagerWorkOrder: builder.query({
      query: (workOrderId) => ({
        url: `${WORK_ORDERS_URL}/property-manager/${workOrderId}`,
        method: "GET",
      }),
    }),

    // showVendorWorkOrder: GET /api/v1/work-orders/vendor/:workOrderId

    // Create - Work Order
    createWorkOrder: builder.mutation({
      query: ({ projectId, data }) => ({
        url: `${WORK_ORDERS_URL}/property-manager/${projectId}`,
        method: "POST",
        body: data,
      }),
    }),

    // Update - Mark Work Order as Accepted
    updateWorkOrder: builder.mutation({
      query: ({ projectId, workOrderId, data }) => ({
        url: `${WORK_ORDERS_URL}/property-manager/${projectId}/${workOrderId}`,
        method: "PUT",
        body: data,
      }),
    }),
    // /property-manager/:projectId/:workOrderId

    // rescheduleWorkOrder: PUT /api/v1/work-orders/vendor/:projectId/:workOrderId

    // deleteWorkOrder: DELETE /api/v1/work-orders/property-manager/:projectId/:workOrderId

    /*
    // Update - Mark Read Property Manager Notification
    markReadPropertyManagerNotification: builder.mutation({
      query: ({ propertyManagerId, notificationId }) => ({
        // , data
        url: `${WORK_ORDERS_URL}/propertyManager/${propertyManagerId}/${notificationId}`,
        method: "PUT",
        // body: data,
      }),
    }),

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
  // Create
  useCreateWorkOrderMutation,
  // Update
  useUpdateWorkOrderMutation,
  // Delete
} = workOrderApiSlice; // Export hooks for usage in components
