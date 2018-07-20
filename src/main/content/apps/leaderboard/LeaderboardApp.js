import React, { Component } from "react";
import { connect } from "react-redux";
import { FusePageCarded } from "@fuse";
import { getProfiles, setTerm, setIndustry } from "./store/actions/leaderboard.actions";
import { debounce } from "lodash";

import IndustriesFilter from "./filters/IndustriesFilter";
import TermFilter from "./filters/TermFilter";
import LeaderboardHeader from "./LeaderboardHeader";
import LeaderboardList from "./LeaderboardList";

const mapState = ({ leaderboardApp }) => ({
  profiles: leaderboardApp.leaderboard.profiles,
  term: leaderboardApp.leaderboard.term,
  industry: leaderboardApp.leaderboard.industry,
  page: leaderboardApp.leaderboard.page,
  loading: leaderboardApp.leaderboard.fetching
});

const actions = {
  getProfiles,
  setTerm,
  setIndustry
};

export class LeaderboardApp extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }

  componentDidUpdate(prevProps) {
    const { term, page, industry } = this.props;
    if (term !== prevProps.term || page !== prevProps.page || industry !== prevProps.industry) {
      this.searchWhenStopTyping();
    }
  }

  searchWhenStopTyping = debounce(() => {
    this.props.getProfiles(this.props.page, this.props.term, this.props.industry);
  }, 300);

  loadNextPage = isVisible => {
    const { getProfiles, page, term } = this.props;
    isVisible && page && getProfiles(page, term);
  };

  render() {
    const { profiles, term, setTerm, setIndustry, industry, page, loading } = this.props;
    const termFilter = <TermFilter setTerm={setTerm} term={term} />;
    const industriesFilter = <IndustriesFilter setIndustry={setIndustry} industry={industry} />;

    return (
      <FusePageCarded
        header={<LeaderboardHeader termFilter={termFilter} industriesFilter={industriesFilter} />}
        content={
          <LeaderboardList
            loading={loading}
            profiles={profiles}
            loadNextPage={this.loadNextPage}
            page={page}
          />
        }
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
