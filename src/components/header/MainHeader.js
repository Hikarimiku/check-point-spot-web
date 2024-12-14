import React from "react";
import {
  Toolbar,
  Typography,
  IconButton
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { CustomAppBar } from "../CustomAppBar.js";
import { useSelector } from "react-redux";

export default function MainHeader({ drawerWidth, open, handleDrawerOpen }) {
  const userProfile = useSelector((state) => state.userProfile);


  return (
    <CustomAppBar
      position="fixed"
      open={open}
      style={{
        width: open ? `calc(100% - ${drawerWidth}px)` : "100%",
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(open && { display: "none" }) }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Welcome Back{", " + userProfile.firstName}
        </Typography>

{/* 
        <div style={{ marginLeft: "auto" }}>
          <IconButton size="large" onClick={handleMenu}>
            <Avatar
              {...commonFunction.stringAvatar(userProfile)}
              sx={{ bgcolor: secondaryTheme, color: primaryTheme }}
            />
          </IconButton>

          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={clickProfile}>Profile</MenuItem>
            <MenuItem onClick={clickLogOut}>Log Out</MenuItem>
          </Menu>
        </div> */}
      </Toolbar>
    </CustomAppBar>
  );
}
