import React from "react";
import { Paper, CircularProgress } from "@material-ui/core";
import VisibilitySensor from "react-visibility-sensor";

import LeaderboardProfile from "./LeaderboardProfile";

const LeaderboardList = ({ profiles, loadNextPage, page, loading }) => {
  return (
    <div id="leaderboard-list">
      {profiles.length === 0 && !loading && <h4 className="mt-64" style={{textAlign: "center"}}>No profile found</h4>}
      {profiles &&
        profiles.map(profile => (
          <Paper key={profile.id} className="leaderboard-profile-row" elevation={1}>
            <LeaderboardProfile profile={profile} />
          </Paper>
        ))}
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

export default LeaderboardList;
