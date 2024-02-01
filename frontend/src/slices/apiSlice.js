//====================
// Slices (from Redux Toolkit) are a way to organize reducers, actions, and selectors into one file.
//====================
// Dependencies
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: "" }); // This is empty because a proxy was defined in vite.config.js

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Vendor"], // Used for caching (add other types as needed e.g. Products, Projects, etc.)
  endpoints: (builder) => ({}), // Parent of other API slices
});
