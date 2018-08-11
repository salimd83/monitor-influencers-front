import React from "react";
import { Grid, Avatar, Typography } from "@material-ui/core";
import { format } from "date-fns";

const PostOwner = ({ post }) => {
  return (
    <React.Fragment>
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
            {format(post.created_at, 'MMMM D, YYYY HH:mm')}
        </Typography>
      </Grid>
    </React.Fragment>
  );
};

export default PostOwner;
