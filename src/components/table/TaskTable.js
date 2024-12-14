import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  Tooltip,
  Typography,
  Button,
  TablePagination,
  Checkbox
} from "@mui/material";
import { networkErrorMsg, secondaryTheme } from "../../variables/constant";
import DeleteIcon from "@mui/icons-material/Delete";
import taskSvc from "../../service/taskSvc";
import {
  setErrorSnackbar,
  setSuccessSnackbar,
} from "../../store/slice/snackbarSlice";
import { useDispatch } from "react-redux";

export default function TaskTable({
  lsTask,
  displayMsg,
  reloadData,
  paging,
  updatePaging,
  updatePagingSize
}) {
  const inProgress = "IN PROGRESS";
  const dispatch = useDispatch();

  const handleChange = (event, updateObj) => {
    var newUpdateObj = updateObj;
    if(newUpdateObj.status !== "COMPLETED"){
      if(updateObj.status === "IN PROGRESS"){
        newUpdateObj.status = "DONE";
      }
      else{
        newUpdateObj.status = "IN PROGRESS";
      }

      checkBoxClick(newUpdateObj);
    }

  };

  const checkBoxClick = async (updateObj) => {
    try {
      const res = await taskSvc.update(updateObj);
      if (res.code === 200) {
        dispatch(setSuccessSnackbar(res.message));
        reloadData();
      } else dispatch(setErrorSnackbar(res.message));
    } catch (error) {
      dispatch(setErrorSnackbar(networkErrorMsg));
    }
  };

  return (
    <Box sx={{ overflow: "auto" }}>
      <Box sx={{ width: "100%", display: "table", tableLayout: "fixed", mb: 5 }}>
        <Table>
          <TableHead>
            <TableRow>
            <TableCell
                sx={{ color: secondaryTheme, font: "bold", width: "10%" }}
              >
                Row
              </TableCell>
              <TableCell
                sx={{ color: secondaryTheme, font: "bold", width: "50%" }}
              >
                Description
              </TableCell>
              <TableCell
                sx={{ color: secondaryTheme, font: "bold", width: "20%" }}
              >
                Total Dependencies
              </TableCell>
              <TableCell
                sx={{ color: secondaryTheme, font: "bold", width: "15%" }}
              >
                Status
              </TableCell>
              <TableCell
                sx={{ color: secondaryTheme, font: "bold", width: "10%" }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lsTask.map((row, index) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell component="th" scope="row">
                  <Typography>In Progress: <b> {row.totalDependency - row.totalDependencyDone - row.totalDependencyComplete}</b> </Typography>
                  <Typography>Done: <b>{row.totalDependencyDone}</b> </Typography>
                  <Typography>Completed: <b>{row.totalDependencyComplete}</b> </Typography>
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.status}
                </TableCell>
                <TableCell>
                  <Tooltip title="Tick To Mark the Status as Done" placement="bottom">
                    <Checkbox
                      checked={row.status !== inProgress}
                      onChange={(event) => handleChange(event, row)}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <Typography color="error" variant="p">
            {displayMsg}
          </Typography>
        </Table>
{/*       
        <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={lsTask.length > 0 ? lsTask[0].totalData : 0}
            rowsPerPage={paging.size}
            page={paging.page}
            onPageChange={updatePaging}
            onRowsPerPageChange={updatePagingSize}
          /> */}

      </Box>
    </Box>
  );
}
