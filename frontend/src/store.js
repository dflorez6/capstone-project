//====================
// Redux Store
//====================
// Dependencies
import { configureStore } from "@reduxjs/toolkit";
import vendorAuthReducer from "./slices/vendorAuthSlice";
import propertyManagerAuthReducer from "./slices/propertyManagerAuthSlice";
import { apiSlice } from "./slices/apiSlice";

// Store
const store = configureStore({
  reducer: {
    vendorAuth: vendorAuthReducer,
    propertyManagerAuth: propertyManagerAuthReducer,
    [apiSlice.reducerPath]: apiSlice.reducer, // Parent of other API slices
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
