import React from "react";
import { Icon, Typography, Grid, IconButton } from "@material-ui/core";
import { FuseAnimate } from "@fuse";
import ProfileFilter from "./filters/ProfileFilter";
import DateFilter from './filters/DateFilter'
import TagsFilter from './filters/TagsFilter'
import TypeFilter from './filters/TypeFilter'

const LeaderboardHeader = ({from, to, profile, tags, types, fromChange, toChange, profileChange, tagsChange, typesChange, handleClick}) => {
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
            <Grid container spacing={16} alignItems="center" direction="row" style={{zIndex: 1000}}>
              <Grid item>
                <DateFilter
                  {...{
                    to,
                    from,
                    fromChange,
                    toChange
                  }}
                />
              </Grid>
              <Grid item id="profileFilter">
                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                  <ProfileFilter profileChange={profileChange} profile={profile} />
                </FuseAnimate>
              </Grid>
              <Grid item id="tagsFilter">
                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                  <TagsFilter tagsChange={tagsChange} tags={tags} />
                </FuseAnimate>
              </Grid>
              <Grid item id="typeFilter">
                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                  <TypeFilter typesChange={typesChange} types={types} />
                </FuseAnimate>
              </Grid>
              <Grid item id="typeFilter">
                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                <IconButton onClick={handleClick} aria-label="Delete">
                  <Icon>check_circle</Icon>
                </IconButton>
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
