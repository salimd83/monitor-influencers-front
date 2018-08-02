import React from "react";
import { Grid, Avatar, Typography } from "@material-ui/core";
import { format } from "date-fns";

const PostOwner = ({ post }) => {
  return (
    <div className="post-owner">
      <Grid container spacing={8}>
        <Grid item style={{ textAlign: "center" }}>
          <Avatar aria-label="Recipe">
            <img src={post.owner.profile_picture} alt="" />
          </Avatar>
        </Grid>
        <Grid item>
          <Typography variant="body2">
            {post.owner.first_name} {post.owner.last_name}
          </Typography>
          <Typography variant="caption">
            <b>Created at:</b> {format(post.created_at, "MMMM D, YYYY")} |
            <b>Captured at:</b> {format(post.captured_at, "MMMM D, YYYY")}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default PostOwner;
