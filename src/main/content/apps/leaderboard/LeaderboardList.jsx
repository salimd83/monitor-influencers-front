import React from "react";
import { Paper } from "@material-ui/core";

import LeaderboardProfile from './LeaderboardProfile'

const LeaderboardList = ({ profiles }) => {
  return (
    <div>
      {profiles &&
        profiles.map(profile => (
          <Paper key={profile.id} className="leaderboard-profile-row" elevation={1}>
            <LeaderboardProfile profile={profile} />
          </Paper>
        ))}
    </div>
  );
};

export default LeaderboardList;
