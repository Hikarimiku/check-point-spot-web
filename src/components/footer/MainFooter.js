import React from "react";
import { Toolbar, Typography, Link } from "@mui/material";
import { copyRight } from "../../variables/constant.js";
import { CustomAppBar } from "../CustomAppBar.js";

export default function MainFooter({ drawerWidth, open }) {
  return (
    <CustomAppBar
      position="fixed"
      style={{
        top: "auto",
        bottom: 0,
        width: open ? `calc(100% - ${drawerWidth}px)` : "100%",    
      }}
    >
      <Toolbar>
        <Typography
          color="secondary"
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
        >
          {"Copyright © "}
          <Link
            color="inherit"
            href="https://discordapp.com/users/hikarimiku"
            target="_blank"
            rel="noopener"
          >
            {copyRight}
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Toolbar>
    </CustomAppBar>
  );
}
