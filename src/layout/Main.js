import { Box, CssBaseline } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router";
import { MainBody } from "../components/body/MainBody.js";
import { CustomDrawerHeader } from "../components/CustomDrawerHeader.js";
import CustomSidebar from "../components/CustomSidebar.js";
import CustomSnackBar from "../components/CustomSnackBar.js";
import MainFooter from "../components/footer/MainFooter.js";
import MainHeader from "../components/header/MainHeader.js";
import Dashboard from "../page/main/Dashboard.js";
import { drawerWidth } from "../variables/constant.js";
import Task from "../page/main/Task.js";

export default function Main() {
  const [open, setOpen] = useState(true);
  const userProfile = useSelector((state) => state.userProfile);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <MainHeader
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        drawerWidth={drawerWidth}
      />
      <CustomSidebar
        handleDrawerClose={handleDrawerClose}
        open={open}
        drawerWidth={drawerWidth}
        access={
          userProfile.userGroup !== null ? userProfile.userGroup.name : ""
        }
      />
      <MainBody open={open} drawerwidth={drawerWidth}>
        <CustomDrawerHeader />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/task" element={<Task />} />
        </Routes>
      </MainBody>
      <CustomSnackBar />
      <MainFooter open={open} drawerWidth={drawerWidth} />
    </Box>
  );
}
