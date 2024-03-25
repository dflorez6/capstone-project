//====================
// Slices (from Redux Toolkit) are a way to organize reducers, actions, and selectors into one file.
//====================
// Dependencies
import { apiSlice } from "./apiSlice";

const PROJECT_APPLICATIONS_URL = "/api/v1/project-applications";

export const projectApplicationsApiSlice = apiSlice.injectEndpoints({
  // Endpoints
  endpoints: (builder) => ({
    // Index - Get All Project Applications (Property Manager)
    getProjectApplications: builder.query({
      query: ({ propertyManagerId }) => ({
        url: `${PROJECT_APPLICATIONS_URL}/${propertyManagerId}`,
        method: "GET",
      }),
    }),

    // Create Project Application
    createProjectApplication: builder.mutation({
      query: (data) => ({
        url: `${PROJECT_APPLICATIONS_URL}`,
        method: "POST",
        body: data,
      }),
    }),

    // Accept Project Application
    acceptProjectApplication: builder.mutation({
      query: (data) => ({
        url: `${PROJECT_APPLICATIONS_URL}/accept`,
        method: "PUT",
        body: data,
      }),
    }),

    // Reject Project Application
    rejectProjectApplication: builder.mutation({
      query: (data) => ({
        url: `${PROJECT_APPLICATIONS_URL}/reject`,
        method: "PUT",
        body: data,
      }),
    }),

    // Update Notification Status
    // TODO: Pending for implementation

    // Add API Endpoint
  }),
});

export const {
  useGetProjectApplicationsQuery,
  useCreateProjectApplicationMutation,
  useAcceptProjectApplicationMutation,
  useRejectProjectApplicationMutation,
  // TODO: Update NotificationStatus
} = projectApplicationsApiSlice; // Export hooks for usage in components
