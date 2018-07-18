import React, { Component } from "react";
import { connect } from "react-redux";
import { FusePageSimple } from "@fuse";
import { getProfiles } from "./store/actions/leaderboard.actions";

import LeaderboardHeader from "./LeaderboardHeader";
import LeaderboardList from "./LeaderboardList";

const mapState = ({ leaderboardApp }) => ({
  profiles: leaderboardApp.leaderboard.profiles
});

const actions = {
  getProfiles
};

export class LeaderboardApp extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }
  
  render() {
    const { profiles } = this.props;
    return (
      <FusePageSimple
        header={<LeaderboardHeader />}
        content={<LeaderboardList profiles={profiles} />}
        sidebarInner
        onRef={instance => {
          this.pageLayout = instance;
        }}
      />
    );
  }
}

export default connect(
  mapState,
  actions
)(LeaderboardApp);
