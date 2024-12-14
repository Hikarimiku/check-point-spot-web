import * as React from "react";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { menu } from "../variables/menu";

export default function CustomBreadCrumb() {
  const location = useLocation();
  const [listBreadCrumb, setListBreadCrumb] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    generateBreadCrumb();
  }, []);

  function generateBreadCrumb() {
    let pathName = [];
    const filtered = menu.filter((item) => item.path === location.pathname);

    if (filtered.length > 0)
      pathName.push({ name: filtered[0].name, path: filtered[0].path });
    else
      menu.map((obj) => {
        if (obj.subMenu.length > 0) {
          const subFiltered = obj.subMenu.filter(
            (item) => item.path === location.pathname
          );

          if (subFiltered.length > 0) {
            pathName.push({ name: obj.name, path: obj.path });
            pathName.push({
              name: subFiltered[0].name,
              path: subFiltered[0].path,
            });
          }
        }
        return null;
      });

    setListBreadCrumb(pathName);
  }

  const buttonClick = (obj) => {
    if (obj.path !== "") {
      navigate(obj.path);
      generateBreadCrumb();
    }
  };

  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
      {listBreadCrumb.map((obj) => (
        <Link
          key={obj.name}
          component="button"
          onClick={() => buttonClick(obj)}
          className={obj.path === "" ? "disabledLink" : null}
          underline={obj.path === "" ? "none" : "hover"}
        >
          <Typography>{obj.name}</Typography>
        </Link>
      ))}
    </Breadcrumbs>
  );
}
