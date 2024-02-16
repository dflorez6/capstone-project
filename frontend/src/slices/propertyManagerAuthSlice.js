//====================
// Slices (from Redux Toolkit) are a way to organize reducers, actions, and selectors into one file.
//====================
// Dependencies
import { createSlice } from "@reduxjs/toolkit"; // Implements Thunk middleware

// Initial State
const initialState = {
  // Check Local Storage
  propertyManagerInfo: localStorage.getItem("propertyManagerInfo")
    ? JSON.parse(localStorage.getItem("propertyManagerInfo"))
    : null,
};

// Slice
const propertyManagerAuthSlice = createSlice({
  name: "propertyManagerAuth",
  initialState,
  reducers: {
    // Set Credentials (log in)
    propertyManagerSetCredentials: (state, action) => {
      state.propertyManagerInfo = action.payload; // Property Manager data added to the Store
      localStorage.setItem("propertyManagerInfo", JSON.stringify(action.payload)); // Property Manager data saved to local storage
    },
    // Clear Credentials (log out)
    propertyManagerClearCredentials: (state, action) => {
      state.propertyManagerInfo = null;
      localStorage.removeItem("propertyManagerInfo");
    },
  },
});


// Export Actions
export const { propertyManagerSetCredentials, propertyManagerClearCredentials } = propertyManagerAuthSlice.actions;

// Export Reducer
export default propertyManagerAuthSlice.reducer;
