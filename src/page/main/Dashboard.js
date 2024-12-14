import React from "react";
import { Box } from "@mui/material";
import CustomBreadCrumb from "../../components/CustomBreadCrumb";
import Grid from "@mui/material/Grid2";
import WeatherCard from "../../components/card/WeatherCard";

function Dashboard() {
  return (
    <Box>
      <CustomBreadCrumb />
      <Grid container>
        <Grid lg={3} md={4} sm={6} xs={12} sx={{ mb: 3 }}>
          <WeatherCard />
        </Grid>
        {/* <Grid lg={8} md={6} xs={12} sx={{ mb: 3 }}>
          <NewsCard />
        </Grid> */}
      </Grid>
    </Box>
  );
}

export default Dashboard;
