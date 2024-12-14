import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import {
  TextField,
  Button,
  Paper,
  Skeleton,
  Box,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  FormHelperText,
} from "@mui/material";
import CustomBreadCrumb from "../../components/CustomBreadCrumb";
import taskSvc from "../../service/taskSvc";
import AddIcon from "@mui/icons-material/Add";
import {
  timeoutDebouncer,
  networkErrorMsg,
  noRecordMsg,
} from "../../variables/constant";
import TaskDialog from "../../components/dialog/TaskDialog";
import TaskTable from "../../components/table/TaskTable";

function Task() {
  const initForm = {
    name: "",
    status: "",
    paging: {
      page: 0,
      size: 10000,
    },
  };
  const [searchForm, setSearchForm] = useState(initForm);
  const [lsTask, setLsTask] = useState([]);
  const [loading, setLoading] = useState(true);
  const [displayMsg, setDisplayMsg] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [typeOperation, setTypeOperation] = useState("Add");
  const [dataUpdate, setDataUpdate] = useState(null);
  const [selectStatus, setSelectStatus] = useState("ALL");

  useEffect(() => {
    const timer = setTimeout(() => {
      loadData();
    }, timeoutDebouncer);

    return () => {
      clearTimeout(timer);
    };
  }, [searchForm]);

  const loadData = async () => {
    setLoading(true);
    setLsTask([]);
    setDisplayMsg("");
    try {
      const res = await taskSvc.search(searchForm);
      if (res.code !== undefined && res.code === 200) {
        if (res.data.length > 0) setLsTask(res.data);
        else setDisplayMsg(noRecordMsg);
      } else setDisplayMsg(res.message);
    } catch (error) {
      setDisplayMsg(networkErrorMsg);
    } finally {
      setLoading(false);
    }
  };

  const searchChange = (e) => {
    setSearchForm({
      ...searchForm,
      name: e.target.value
    });
  };

  const selectChange = (e) => {
    var valueSelect = e.target.value === "ALL" ? "" : e.target.value;
    setSelectStatus( e.target.value);
    setSearchForm({
      ...searchForm,
      status:valueSelect
    });
  };

  const updatePaging = (e, newPage) => {
    console.log(newPage)
    setSearchForm({
      ...searchForm,
      paging:{...searchForm.paging, page: e.target.value}
    });
    loadData();
  };

  const updatePagingSize = (e) => {
    setSearchForm({
      ...searchForm,
      paging:{page: 0, size:e.target.value}
    });
    loadData();
  };

  const closeDialog = () => {
    setShowDialog(false);
  };

  const reloadData = () => {
    loadData("");
  };

  const createTask = () => {
    setShowDialog(true);
    setTypeOperation("Add");
  };

  const updateTask = (obj) => {
    setShowDialog(true);
    setTypeOperation("Update");
    setDataUpdate(obj);
  };

  return (
    <Box>
      <CustomBreadCrumb />
      <Paper elevation={10} sx={{ p: 3 }}>
        <Grid container sx={{ ml: 0 }}>
          <Grid size={{ xs: 8, md: 6}}>
            <TextField
              id="txtSearch"
              label="Search by description"
              fullWidth
              onChange={searchChange}
            />
          </Grid>
          <Grid
            size={{ xs: 4, md: 3 }}
            sx={{
              pl: 2,
              pb: 2,
            }}
          >
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">
                Status
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={selectStatus}
                onChange={selectChange}
                label="Status"
              >
                <MenuItem value={"ALL"}>ALL</MenuItem>
                <MenuItem value={"DONE"}>DONE</MenuItem>
                <MenuItem value={"IN PROGRESS"}>IN PROGRESS</MenuItem>
                <MenuItem value={"COMPLETED"}>COMPLETED</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid
            size={{ xs: 12, md: 3 }}
            sx={{
              pl: 2,
              display: "flex",
              flexDirection: "row",
              justifyContent: "end",
            }}
          >
            <Button
              variant="contained"
              size="small"
              startIcon={<AddIcon />}
              onClick={createTask}
            >
              New Task
            </Button>
          </Grid>
        </Grid>
        <TaskDialog
          showDialog={showDialog}
          closeDialog={closeDialog}
          typeOperation={typeOperation}
          dataUpdate={dataUpdate}
          reloadData={reloadData}
        />
      </Paper>
      <Grid container>
        <Grid xs={12} sx={{ mt: 2 }}>
          {loading ? (
            <Skeleton animation="wave" />
          ) : (
            <TaskTable
              lsTask={lsTask}
              displayMsg={displayMsg}
              reloadData={reloadData}
              paging={searchForm.paging}
              updatePaging={updatePaging}
              updatePagingSize={updatePagingSize}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default Task;
