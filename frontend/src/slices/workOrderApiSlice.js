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

    // TODO: ACA QUEDE
    // TODO Implement the following endpoint
    // getVendorProjectWorkOrders: GET /api/v1/work-orders/vendor/:vendorId/project/:projectId

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

    // Endpoints
    // showPropertyManagerWorkOrder: GET /api/v1/work-orders/property-manager/:projectId/:workOrderId
    // showVendorWorkOrder: GET /api/v1/work-orders/vendor/:projectId/:workOrderId
    // createWorkOrder: POST /api/v1/work-orders/property-manager/:projectId
    // updateWorkOrder: PUT /api/v1/work-orders/property-manager/:projectId/:workOrderId
    // rescheduleWorkOrder: PUT /api/v1/work-orders/vendor/:projectId/:workOrderId
    // deleteWorkOrder: DELETE /api/v1/work-orders/property-manager/:projectId/:workOrderId

    /*
    // Index - Get All Vendor Notifications
    getVendorNotifications: builder.query({
      query: ({ vendorId }) => ({
        url: `${WORK_ORDERS_URL}/vendor/${vendorId}`,
        method: "GET",
      }),
    }),

    // Update - Mark Read Property Manager Notification
    markReadPropertyManagerNotification: builder.mutation({
      query: ({ propertyManagerId, notificationId }) => ({
        // , data
        url: `${WORK_ORDERS_URL}/propertyManager/${propertyManagerId}/${notificationId}`,
        method: "PUT",
        // body: data,
      }),
    }),

    // Update - Mark Read Vendor Notification
    markReadVendorNotification: builder.mutation({
      query: ({ vendorId, notificationId }) => ({
        url: `${WORK_ORDERS_URL}/vendor/${vendorId}/${notificationId}`,
        method: "PUT",
      }),
    }),

    // Delete - Property Manager Notification
    deletePropertyManagerNotification: builder.mutation({
      query: ({ propertyManagerId, notificationId }) => ({
        url: `${WORK_ORDERS_URL}/propertyManager/${propertyManagerId}/${notificationId}`,
        method: "DELETE",
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
  useGetPropertyManagerProjectWorkOrdersQuery,
  useGetAllPropertyManagerWorkOrdersQuery,
  useGetAllVendorWorkOrdersQuery,
  useMarkReadPropertyManagerNotificationMutation,
  useMarkReadVendorNotificationMutation,
  useDeletePropertyManagerNotificationMutation,
  useDeleteVendorNotificationMutation,
} = workOrderApiSlice; // Export hooks for usage in components
