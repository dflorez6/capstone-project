//====================
// Slices (from Redux Toolkit) are a way to organize reducers, actions, and selectors into one file.
//====================
// Dependencies
import { apiSlice } from "./apiSlice";

const NOTIFICATIONS_URL = "/api/v1/notifications";

export const projectApiSlice = apiSlice.injectEndpoints({
  // Endpoints
  endpoints: (builder) => ({
    // Index - Get All Property Manger Notifications
    getPropertyManagerNotifications: builder.query({
      query: ({ propertyManagerId }) => ({
        url: `${NOTIFICATIONS_URL}/propertyManager/${propertyManagerId}`,
        method: "GET",
      }),
    }),

    // Index - Get All Vendor Notifications
    getVendorNotifications: builder.query({
      query: ({ vendorId }) => ({
        url: `${NOTIFICATIONS_URL}/vendor/${vendorId}`,
        method: "GET",
      }),
    }),

    // Update - Mark Read Property Manager Notification
    markReadPropertyManagerNotification: builder.mutation({
      query: ({ propertyManagerId, notificationId }) => ({
        // , data
        url: `${NOTIFICATIONS_URL}/propertyManager/${propertyManagerId}/${notificationId}`,
        method: "PUT",
        // body: data,
      }),
    }),

    // Update - Mark Read Vendor Notification
    markReadVendorNotification: builder.mutation({
      query: ({ vendorId, notificationId }) => ({
        url: `${NOTIFICATIONS_URL}/vendor/${vendorId}/${notificationId}`,
        method: "PUT",
      }),
    }),

    // Delete - Property Manager Notification
    deletePropertyManagerNotification: builder.mutation({
      query: ({ propertyManagerId, notificationId }) => ({
        url: `${NOTIFICATIONS_URL}/propertyManager/${propertyManagerId}/${notificationId}`,
        method: "DELETE",
      }),
    }),

    // Delete - Vendor Notification
    deleteVendorNotification: builder.mutation({
      query: ({ vendorId, notificationId }) => ({
        url: `${NOTIFICATIONS_URL}/vendor/${vendorId}/${notificationId}`,
        method: "DELETE",
      }),
    }),

    // Add API Endpoint
  }),
});

export const {
  useGetPropertyManagerNotificationsQuery,
  useGetVendorNotificationsQuery,
  useMarkReadPropertyManagerNotificationMutation,
  useMarkReadVendorNotificationMutation,
  useDeletePropertyManagerNotificationMutation,
  useDeleteVendorNotificationMutation,
} = projectApiSlice; // Export hooks for usage in components
