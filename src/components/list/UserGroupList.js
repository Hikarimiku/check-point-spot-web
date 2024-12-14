import React from "react";
import { Typography, Paper, IconButton } from "@mui/material";
import {
  networkErrorMsg,
  roundedPaper,
  labelColor,
} from "../../variables/constant";
import Grid from "@mui/material/Grid2";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import userGroupSvc from "../../service/taskSvc";
import {
  setErrorSnackbar,
  setSuccessSnackbar,
} from "../../store/slice/snackbarSlice";
import { useDispatch } from "react-redux";
import CustomFeedback from "../CustomFeedback";
import CustomPaging from "../CustomPaging";

export default function UserGroupList({
  lsData,
  displayMsg,
  updateUserGroup,
  reloadData,
}) {
  const dispatch = useDispatch();
  const updateClick = (obj) => {
    updateUserGroup(obj);
  };

  const deleteClick = async (obj) => {
    try {
      const res = await userGroupSvc.deleteUserGroup(obj);
      if (res.code === 200) {
        dispatch(setSuccessSnackbar(res.message));
        reloadData();
      } else dispatch(setErrorSnackbar(res.message));
    } catch (error) {
      dispatch(setErrorSnackbar(networkErrorMsg));
    }
  };

  return (
    <Grid container>
      {lsData.map((obj) => (
        <Grid lg={3} md={4} sm={6} xs={12} sx={{ mt: 3 }} key={obj.name}>
          <Paper elevation={10} sx={roundedPaper}>
            <Grid container>
              <Grid xs={8}>
                <Typography variant="h5" color="primary">
                  {obj.name}
                </Typography>
              </Grid>
              <Grid xs={2} sx={{ display: "flex", justifyContent: "end" }}>
                <IconButton onClick={(e) => updateClick(obj)}>
                  <EditIcon color="primary" />
                </IconButton>
              </Grid>
              <Grid xs={2} sx={{ display: "flex", justifyContent: "end" }}>
                <IconButton onClick={(e) => deleteClick(obj)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </Grid>
              <Grid xs={12}>
                <Typography variant="subtitle1" color={labelColor}>
                  Total User: {obj.totalUser}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      ))}

      {lsData.length === 0 ? (
        <Grid xs={12} sx={{ mt: 3 }}>
          <CustomFeedback
            severity={"info"}
            displayMsg={displayMsg}
            title={""}
          />
        </Grid>
      ) : (
        <Grid xs={12} sx={{ mt: 3 }}>
          <CustomPaging></CustomPaging>
        </Grid>
      )}
    </Grid>
  );
}
