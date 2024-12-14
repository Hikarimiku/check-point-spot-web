import * as React from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Collapse,
  Drawer,
  Divider,
  IconButton,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useNavigate, useLocation } from "react-router-dom";
import { menu } from "../variables/menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useTheme } from "@mui/material/styles";
import { CustomDrawerHeader } from "./CustomDrawerHeader";
import { secondaryTheme, titleWebApp } from "../variables/constant";

const CustomSidebar = ({ drawerWidth, open, handleDrawerClose, access }) => {
  const location = useLocation();
  const theme = useTheme();
  const navigate = useNavigate();
  const [listMenu, setListMenu] = React.useState(menu);

  const navigateClick = (path) => {
    if (path !== "") navigate(path, { replace: true });
  };

  const collapseClick = (i) => {
    const newListMenu = [...listMenu];
    newListMenu[i].isOpen = !newListMenu[i].isOpen;
    setListMenu(newListMenu);
  };

  function mainMenu(obj) {
    return obj.access === access.toLowerCase() || obj.access === "" ? (
      <ListItemButton
        onClick={() => navigateClick(obj.path)}
        selected={obj.path === location.pathname}
      >
        {obj.icon !== undefined ? (
          <ListItemIcon>{React.createElement(obj.icon)}</ListItemIcon>
        ) : null}
        <Typography component="div">
          <ListItemText primary={obj.name} />
        </Typography>
      </ListItemButton>
    ) : null;
  }

  function subMenu(obj, i) {
    return (
      <List sx={{ width: "100%" }}>
        <ListItemButton onClick={() => collapseClick(i)}>
          <ListItemText primary={obj.name} />
          {obj.isOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse timeout="auto" unmountOnExit in={obj.isOpen}>
          <List component="div" disablePadding>
            {obj.subMenu.map((subObj) => (
              <ListItem key={subObj.name} disablePadding>
                {mainMenu(subObj)}
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>
    );
  }

  function generateMenu(obj, i) {
    return obj.subMenu.length > 0 ? subMenu(obj, i) : mainMenu(obj);
  }

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <CustomDrawerHeader>
        <Typography variant="h4" color="primary">
          {titleWebApp}
        </Typography>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </CustomDrawerHeader>
      <Divider />
      <List sx={{ backgroundColor: secondaryTheme, height: "100%" }}>
        {listMenu.map((obj, i) => (
          <ListItem key={obj.name} disablePadding>
            {obj.isSideBar ? generateMenu(obj, i) : null}
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default CustomSidebar;
