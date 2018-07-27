import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardHeader,
  Avatar,
  IconButton,
  Icon
} from "@material-ui/core";
import red from "@material-ui/core/colors/red";
import { format } from "date-fns";

const styles = {
  card: {
    maxWidth: 400
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  action: {
    color: red[500]
  }
};

const MediaAppPost = ({ classes, post }) => {
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="Recipe">
            <img src={post.owner.profile_picture} alt="" />
          </Avatar>
        }
        action={
          <div>
            <IconButton className={classes.action}>
              <i className={`fab fa-${post.platform}`} />
            </IconButton>
            <IconButton className={classes.action}>
              <Icon>{post.type.meta.recommended_icon}</Icon>
            </IconButton>
          </div>
        }
        title={`${post.owner.first_name} ${post.owner.last_name}`}
        // subheader="September 14, 2016"
        subheader={format(post.created_at, "MMMM D, YYYY")}
      />
      <CardMedia className={classes.media} image={post.thumbnail} title="Contemplative Reptile" />
      <CardContent>
        <Typography component="p" className="description">{post.caption}</Typography>
      </CardContent>
    </Card>
  );
};

export default withStyles(styles)(MediaAppPost);
