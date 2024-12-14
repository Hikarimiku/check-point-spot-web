import { configureStore } from "@reduxjs/toolkit";
import userProfileSlice from "./slice/userProfileSlice";
import snackbarSlice from "./slice/snackbarSlice";

const initStore = configureStore({
  reducer: {
    userProfile: userProfileSlice,
    snackbar: snackbarSlice,
  },
}); // Create the store with your root reducer

export default initStore;
