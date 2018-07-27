import React from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import MediaAppPost from "./MediaAppPost";
import VisibilitySensor from "react-visibility-sensor";

const MediaAppList = ({media, page, loadNextPage}) => {
  return (
    <div className="m-32 lazyloading">
      <Grid container id="mediaList" spacing={32}>
      {media && media.length > 0 && media.map(post => <Grid key={post.id} item md={4} sm={6} xs={12}>
          <MediaAppPost post={post} />
        </Grid>)
      }
        
      </Grid>
      {
        (page && (
          <VisibilitySensor onChange={loadNextPage}>
            <div className="loader">
              <CircularProgress size={25} />
            </div>
          </VisibilitySensor>
        ))
      }
    </div>
  );
};

export default MediaAppList;
