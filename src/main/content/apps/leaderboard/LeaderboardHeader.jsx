import React from "react";
import { Icon, Typography, Grid } from "@material-ui/core";
import { FuseAnimate } from "@fuse";

const LeaderboardHeader = ({ industriesFilter, termFilter }) => {
  return (
    <div id="leaderboard-header">
      <Grid
        container
        spacing={16}
        alignItems="center"
        direction="row"
        justify="space-between"
        id="insightHeader"
      >
        <Grid item>
          <div className="flex items-center">
            <FuseAnimate animation="transition.expandIn" delay={300}>
              <Icon className="text-32 mr-12">account_box</Icon>
            </FuseAnimate>
            <FuseAnimate animation="transition.slideLeftIn" delay={300}>
              <Typography variant="title">Social Leaderboard</Typography>
            </FuseAnimate>
          </div>
        </Grid>
        <Grid item>
          <div className="flex items-center">
            <Grid container spacing={16} alignItems="center" direction="row">
              <Grid item style={{zIndex: 1000}}>
                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                  {industriesFilter}
                </FuseAnimate>
              </Grid>
              <Grid item>
                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                  {termFilter}
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
