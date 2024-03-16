//====================
// Slices (from Redux Toolkit) are a way to organize reducers, actions, and selectors into one file.
//====================
// Dependencies
import { apiSlice } from "./apiSlice";

const PROJECTS_URL = "/api/v1/projects";

export const projectApiSlice = apiSlice.injectEndpoints({
  // Endpoints
  endpoints: (builder) => ({
    // Index - Get All Projects
    getProjects: builder.query({
      query: (propertyManagerId) => ({
        url: `${PROJECTS_URL}/${propertyManagerId}`,
        method: "GET",
      }),
    }),

    // Show - Get Project by :propertyManagerId & :projectId
    getProject: builder.query({
      query: ({ propertyManagerId, projectId }) => ({
        url: `${PROJECTS_URL}/${propertyManagerId}/${projectId}`,
        method: "GET",
      }),
    }),

    // Create Project
    createProject: builder.mutation({
      query: ({propertyManagerId, data}) => ({
        url: `${PROJECTS_URL}/${propertyManagerId}`,
        method: "POST",
        body: data,
      }),
    }),

    // Update Project
    updateProject: builder.mutation({
      query: ({ propertyManagerId, projectId, data }) => ({
        url: `${PROJECTS_URL}/${propertyManagerId}/${projectId}`,
        method: "PUT",
        body: data,
      }),
    }),

    // Delete Project
    deleteProject: builder.mutation({
      query: ({ propertyManagerId, projectId }) => ({
        url: `${PROJECTS_URL}/${propertyManagerId}/${projectId}`,
        method: "DELETE",
      }),
    }),

    // Add API Endpoint
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectApiSlice; // Export hooks for usage in components
