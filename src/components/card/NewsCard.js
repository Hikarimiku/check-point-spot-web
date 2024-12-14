import React, { useEffect, useState } from "react";
import { Typography, Button, Tooltip, Paper, Skeleton } from "@mui/material";
import dashboardSvc from "../../service/dashboardSvc";
import Grid from "@mui/material/Grid2";
import { roundedPaper } from "../../variables/constant";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import OpenInNew from "@mui/icons-material/OpenInNew";
import newsGif from "../../assets/news.gif";

function NewsCard() {
  const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
  const [load, setLoad] = useState(false);
  const [news, setNews] = useState([]);

  useEffect(() => {
    setLoad(true);
    try {
      loadNews();
    } catch (error) {
    } finally {
      setLoad(false);
    }
  }, []);

  const loadNews = async () => {
    const res = await dashboardSvc.getTopNews("my");
    setNews(res.articles);
  };

  const newsClick = (linkNews) => {
    window.open(linkNews, "_blank");
  };

  return (
    <Paper elevation={10} sx={[roundedPaper]}>
      {load ? (
        <Skeleton animation="wave" />
      ) : news.length > 0 ? (
        <AutoPlaySwipeableViews enableMouseEvents width={"200px"}>
          {news.map((obj) => (
            <Grid container key={obj.title}>
              <Grid xs={3} sx={{ pr: 3 }}>
                <img
                  src={obj.urlToImage === null ? newsGif : obj.urlToImage}
                  style={{
                    width: "100%",
                    height: "100px",
                    alignItems: "center",
                  }}
                  alt="News"
                />
              </Grid>
              <Grid xs={9}>
                <Typography variant="body1">{obj.title}</Typography>
                <Tooltip title="Go To News" placement="bottom">
                  <Button
                    startIcon={<OpenInNew />}
                    onClick={() => newsClick(obj.url)}
                    size="lg"
                    color="primary"
                    variant="soft"
                  >
                    {"Read more on " +
                      (obj.author === null ? obj.source.name : obj.author)}
                  </Button>
                </Tooltip>
              </Grid>
            </Grid>
          ))}
        </AutoPlaySwipeableViews>
      ) : (
        <Grid container>
          <Grid xs={12}>
            <Typography variant="h6">{"No News"}</Typography>
          </Grid>
        </Grid>
      )}
    </Paper>
  );
}

export default NewsCard;
