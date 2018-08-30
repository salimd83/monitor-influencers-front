import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography, GridList, GridListTile, GridListTileBar } from "@material-ui/core";

const styles = theme => ({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
      backgroundColor: theme.palette.background.paper
    },
    gridList: {
      flexWrap: "nowrap",
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: "translateZ(0)"
    },
    title: {
      color: "#fff"
    },
    titleBar: {
      background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 80%, rgba(0,0,0,0) 100%)",
      color: "#fff"
    }
  });

const RelatedMedia = ({ visuals, classes, handleOpen, open }) => {
  return (
    <div className={classes.root + "related-media"}>
      {visuals && visuals.length > 0 && <Typography variant="body2" gutterBottom>
        Related Media
      </Typography>}
      <GridList className={classes.gridList} cols={2.5}>
        {visuals && visuals.length > 0 && visuals.map(media => (
          <GridListTile key={media.meta.image_src} onClick={handleOpen(media.meta.image_src)}>
            <img src={media.meta.image_src} alt={media.type} />
            <GridListTileBar
              title={media.type}
              classes={{
                root: classes.titleBar,
                title: classes.title
              }}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

export default withStyles(styles)(RelatedMedia);
