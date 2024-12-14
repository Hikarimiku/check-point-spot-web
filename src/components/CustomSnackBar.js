import * as React from "react";
import { Snackbar, Alert } from "@mui/material";
import { timeoutSnackBar } from "../variables/constant";
import { useSelector, useDispatch } from "react-redux";
import { closeSnackbar } from "../store/slice/snackbarSlice";

const CustomSnackBar = () => {
  const dispatch = useDispatch();
  const snackbar = useSelector((state) => state.snackbar);

  const close = () => {
    dispatch(closeSnackbar(snackbar));
  };

  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={timeoutSnackBar}
      onClose={close}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={close}
        severity={snackbar.type}
        variant="filled"
        sx={{ width: "100%" }}
        elevation={10}
      >
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackBar;
