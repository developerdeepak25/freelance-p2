import { createSlice } from "@reduxjs/toolkit";

// Define the initial state
const initialState: { isAuthenticated: boolean } = {
  isAuthenticated: false,
};

// Create the slice
export const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    login: () => {
      return {
        isAuthenticated: true,
      };
    },
    resetAuth: () => {
      return initialState;
    },
    // setAccessToken: (state, action) => {
    //   state.accessToken = action.payload;
    // },
  },
});

// Export the reducer functions
export const { login, resetAuth } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;
