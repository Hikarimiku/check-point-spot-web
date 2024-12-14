import { createSlice } from "@reduxjs/toolkit";

const initSnackbar = {
  open: false,
  type: "success",
  message: "",
};

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState: initSnackbar,
  reducers: {
    setSnackbar: (state, action) => {
      const { payload } = action;
      return payload;
    },
    setSuccessSnackbar: (state, action) => {
      return {
        open: true,
        type: "success",
        message: action.payload,
      };
    },
    setErrorSnackbar: (state, action) => {
      return {
        open: true,
        type: "error",
        message: action.payload,
      };
    },
    resetSnackbar: () => {
      return initSnackbar;
    },
    closeSnackbar: (state, action) => {
      let newState = {
        open: false,
        type: "success",
        message: "",
      };
      newState.type = action.payload.type;
      newState.message = action.payload.message;
      return newState;
    },
  },
});

export const {
  setSnackbar,
  resetSnackbar,
  setSuccessSnackbar,
  setErrorSnackbar,
  closeSnackbar,
} = snackbarSlice.actions;
export default snackbarSlice.reducer;
