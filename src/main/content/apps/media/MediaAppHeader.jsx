import React from "react";
import { Icon, Typography, Grid } from "@material-ui/core";
import { FuseAnimate } from "@fuse";
import ProfileFilter from "./filters/ProfileFilter";

const LeaderboardHeader = () => {
  return (
    <div id="leaderboard-header">
      <Grid
        container
        spacing={16}
        alignItems="center"
        direction="row"
        justify="space-between"
        className="cardedPageHeader"
      >
        <Grid item>
          <div className="flex items-center">
            <FuseAnimate animation="transition.expandIn" delay={300}>
              <Icon className="text-32 mr-12">perm_media</Icon>
            </FuseAnimate>
            <FuseAnimate animation="transition.slideLeftIn" delay={300}>
              <Typography variant="title">Media</Typography>
            </FuseAnimate>
          </div>
        </Grid>
        <Grid item>
          <div className="flex items-center">
            <Grid container spacing={16} alignItems="center" direction="row">
              <Grid item> </Grid>
              <Grid item id="profileFilter">
                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                  <ProfileFilter />
                </FuseAnimate>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default LeaderboardHeader;
