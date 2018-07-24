import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  CardHeader,
  Avatar,
  IconButton
} from "@material-ui/core";
import red from "@material-ui/core/colors/red";
import MoreVertIcon from "@material-ui/icons/MoreVert";

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

const MediaAppPost = ({ classes }) => {
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="Recipe">
            <img src="https://images.unsplash.com/photo-1505204144504-0a48bd7862ee?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=76172e9f72596284b0b185b38e0d122d&auto=format&fit=crop&w=100&q=60" alt=""/>
          </Avatar>
        }
        action={
          <IconButton className={classes.action}>
            <i className="fab fa-instagram" />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardMedia
        className={classes.media}
        image="https://images.unsplash.com/photo-1526409049865-5b0b188372f1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d3fe047bb45259fa0a21c4222010a085&auto=format&fit=crop&w=400&q=60"
        title="Contemplative Reptile"
      />
      <CardContent>
        <Typography component="p">
          Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
          across all continents except Antarctica
        </Typography>
      </CardContent>
    </Card>
  );
};

export default withStyles(styles)(MediaAppPost);
