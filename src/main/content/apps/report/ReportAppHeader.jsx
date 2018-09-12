import React from "react";
import { Icon, Typography, Grid } from "@material-ui/core";
import { FuseAnimate } from "@fuse";
import DateFilter from "./filters/DateFilter";
import ProfileFilter from "./filters/ProfileFilter";

const LeaderboardHeader = ({
  from,
  to,
  handleDateChange,
  handleProfileChange,
  profiles
}) => {
  return (
    <Grid
      container
      alignItems="center"
      direction="row"
      justify="space-between"
      className="cardedPageHeader"
    >
      <Grid item md={2} sm={12} xs={12}>
        <div className="flex items-center">
          <FuseAnimate animation="transition.expandIn" delay={300}>
            <Icon className="text-32 mr-12">perm_report</Icon>
          </FuseAnimate>
          <FuseAnimate animation="transition.slideLeftIn" delay={300}>
            <Typography variant="title">Report</Typography>
          </FuseAnimate>
        </div>
      </Grid>
      <Grid item md={10} sm={12} xs={12}>
        <div className="filters">
          <Grid
            container
            spacing={16}
            direction="row"
            style={{ zIndex: 1000, justifyContent: "flex-end", alignItems: "flex-end" }}
          >
            <Grid item>
              <DateFilter
                {...{
                  to,
                  from,
                  handleDateChange
                }}
              />
            </Grid>
            <Grid item id="profileFilter">
              {/* <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                  <ProfileFilter profileChange={profileChange} profile={profile} />
                </FuseAnimate> */}
              {/* {profiles.length < 5 ? ( */}
                <ProfileFilter
                  profileChange={handleProfileChange}
                  profile={{}}
                />
              {/* ) : (<Typography color="secondary">Remove profile to add another</Typography>)} */}
            </Grid>
            <Grid item id="typeFilter">
              {/* <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                <IconButton onClick={handleClick} aria-label="Delete">
                  <Icon>check_circle</Icon>
                </IconButton>
              </FuseAnimate> */}
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
};

export default LeaderboardHeader;
