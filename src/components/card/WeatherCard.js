import React, { useEffect, useState } from "react";
import { Paper, Typography, IconButton, Skeleton } from "@mui/material";
import dashboardSvc from "../../service/dashboardSvc";
import Grid from "@mui/material/Grid2";
import { roundedPaper, secondaryTheme } from "../../variables/constant";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";

function WeatherCard() {
  const [load, setLoad] = useState(false);
  const [weather, setWeather] = useState({
    location: "",
    temp: "",
    desc: "",
    icon: "",
    errMsg: "",
  });

  const colorWeather = { backgroundColor: "#0492c2", color: secondaryTheme };

  useEffect(() => {
    setLoad(true);
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          loadWeather(position.coords.latitude, position.coords.longitude);
        });
      } else errorWeather("Geolocation is not supported or not turn on");
    } catch (error) {
      errorWeather(error);
    } finally {
      setLoad(false);
    }
  }, []);

  const loadWeather = async (latitude, longitude) => {
    const res = await dashboardSvc.getCurrentWeather(latitude, longitude);
    let weatherObj = {
      location: res.location.region + ", " + res.location.country,
      temp: res.current.temp_c + "°C",
      desc: res.current.condition.text,
      icon: res.current.condition.icon,
      errMsg: "",
    };
    setWeather(weatherObj);
  };

  const errorWeather = (errMsg) => {
    let weatherObj = {
      location: "",
      temp: "",
      desc: "",
      icon: "",
      errMsg: errMsg,
    };
    setWeather(weatherObj);
  };

  return (
    <Paper elevation={10} sx={[colorWeather, roundedPaper]}>
      {load ? (
        <Skeleton animation="wave" />
      ) : weather.errMsg !== "" ? (
        <Grid container>
          <Grid xs={12}>
            <Typography variant="body1">{weather.errMsg}</Typography>
          </Grid>
        </Grid>
      ) : (
        <Grid container>
          <Grid xs={4}>
            <img src={`${weather.icon}`} alt="weather" />
          </Grid>
          <Grid xs={8}>
            <Typography variant="body1">{weather.desc}</Typography>
            <IconButton disabled={true}>
              <DeviceThermostatIcon color="secondary" />
              <Typography variant="h6" color={secondaryTheme}>
                {weather.temp}
              </Typography>
            </IconButton>
            <Typography variant="body1">{weather.location}</Typography>
          </Grid>
        </Grid>
      )}
    </Paper>
  );
}

export default WeatherCard;
