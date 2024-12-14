import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Skeleton
} from "@mui/material";
import validation from "../../function/validation";
import taskSvc from "../../service/taskSvc";
import { networkErrorMsg } from "../../variables/constant";
import {
  setErrorSnackbar,
  setSuccessSnackbar,
} from "../../store/slice/snackbarSlice";
import { useDispatch } from "react-redux";

export default function TaskDialog({
  showDialog,
  closeDialog,
  typeOperation,
  dataUpdate,
  reloadData,
}) {
  const dispatch = useDispatch();
  const [lsTask, setLsTask] = useState([]);
  const initForm = {
    id: {
      value: "",
      required: false,
    },
    name: {
      value: "",
      required: true,
      label: "Task Name",
      isErr: false,
      msg: "",
    },
    parentId: {
      value: "",
      required: false,
      label: "Parent Task ID"
    },
  };
  const [form, setForm] = useState(initForm);

  const formChange = (val, attr) => {
    let newVal = form[attr];
    newVal.value = val;
    setForm((prev) => ({
      ...prev,
      [attr]: newVal,
    }));
    formValidation(attr);
  };

  const formValidation = (attr) => {
    let newForm = form[attr];
    if (form[attr].required)
      newForm = validation.nullCheck(form[attr], newForm.value);

    setForm((prev) => ({
      ...prev,
      [attr]: newForm,
    }));
  };

  const loadData = async () => {
    try {
      const res = await taskSvc.getAll();
      if (res.code !== undefined && res.code === 200 && res.data.length > 0) {
        setLsTask(res.data);
      } 
    } catch (error) {

    } 
  };
  
  const saveClick = async () => {
    formValidation("name");
    if (!form.name.isErr && form.name.value !== "")
      try {
        let res;

        if (typeOperation === "Add"){
          var saveObj =  {
            name:form.name.value.trim(), 
            parentTask:{id: form.parentId.value}
          };
         
          res = await taskSvc.add(saveObj);
        }
        else res = await taskSvc.update(form);

        if (res.code === 200) {
          dispatch(setSuccessSnackbar(res.message));
          closeDialog();
          reloadData();
        } else dispatch(setErrorSnackbar(res.message));
      } catch (error) {

        dispatch(setErrorSnackbar(networkErrorMsg));
      }
  };

  const selectChange = (e) => {
    var valueSelect = e.target.value;
    formChange(valueSelect, "parentId")
  };

  useEffect(() => {
    if (showDialog) {
      loadData();
      setForm(initForm);
    /*  if (typeOperation === "Update") {
        formChange(dataUpdate.id, "id");
        formChange(dataUpdate.name, "name");
      } */
    }
  }, [showDialog]);

  return (
    <div>
      <Dialog
        open={showDialog}
        onClose={closeDialog}
        fullWidth={true}
        maxWidth={"sm"}
      >
        <DialogTitle>{typeOperation + " Task"}</DialogTitle>
        <DialogContent>
          <TextField
            required={form.name.required}
            error={form.name.isErr}
            fullWidth
            id="txtName"
            label={form.name.label}
            value={form.name.value}
            onChange={(e) => formChange(e.target.value, "name")}
            helperText={form.name.msg}
            sx={{ mt: 2 }}
          />
          <FormControl sx={{ mt: 2 }} fullWidth>
            <InputLabel id="demo-simple-select-standard-label">
              Status
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={form.parentId.value}
              onChange={selectChange}
              label="Status"
            >
              {lsTask.map((task) => (
                <MenuItem key={task.id} value={task.id}>
                  {task.name} 
                </MenuItem>
              ))}

            </Select>
          </FormControl>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={saveClick} variant="contained">
            {typeOperation}
          </Button>
          <Button onClick={closeDialog} variant="outlined">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
