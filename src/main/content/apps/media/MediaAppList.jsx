import React from "react";
import { Grid } from "@material-ui/core";
import MediaAppPost from "./MediaAppPost";

const MediaAppList = () => {
  return (
    <div className="m-32">
      <Grid container id="mediaList" spacing={32}>
        <Grid item xs={4}>
          <MediaAppPost />
        </Grid>
        <Grid item xs={4}>
          <MediaAppPost />
        </Grid>
        <Grid item xs={4}>
          <MediaAppPost />
        </Grid>
        <Grid item xs={4}>
          <MediaAppPost />
        </Grid>
        <Grid item xs={4}>
          <MediaAppPost />
        </Grid>
        <Grid item xs={4}>
          <MediaAppPost />
        </Grid>
        <Grid item xs={4}>
          <MediaAppPost />
        </Grid>
      </Grid>
    </div>
  );
};

export default MediaAppList;
