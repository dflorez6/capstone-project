//====================
// Slices (from Redux Toolkit) are a way to organize reducers, actions, and selectors into one file.
//====================
// Dependencies
import { createSlice } from "@reduxjs/toolkit"; // Implements Thunk middleware

// Initial State
const initialState = {
  // Check Local Storage
  vendorInfo: localStorage.getItem("vendorInfo")
    ? JSON.parse(localStorage.getItem("vendorInfo"))
    : null,
};

// Slice
const vendorAuthSlice = createSlice({
  name: "vendorAuth",
  initialState,
  reducers: {
    // Set Credentials (log in)
    setCredentials: (state, action) => {
      state.vendorInfo = action.payload; // Vendor data added to the Store
      localStorage.setItem("vendorInfo", JSON.stringify(action.payload)); // Vendor data saved to local storage
    },
    // Clear Credentials (log out)
    clearCredentials: (state, action) => {
      state.vendorInfo = null;
      localStorage.removeItem("vendorInfo");
    },
  },
});

// Export Actions
export const { setCredentials, clearCredentials } = vendorAuthSlice.actions;

// Export Reducer
export default vendorAuthSlice.reducer;
