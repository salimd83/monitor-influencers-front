import React, { Component } from "react";
import { connect } from "react-redux";
import { FusePageCarded } from "@fuse";
import { getLeaders, setTerm, setIndustry } from "./store/actions/leaderboard.actions";
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
  getLeaders,
  setTerm,
  setIndustry
};

export class LeaderboardApp extends Component {
  componentDidMount() {
    this.props.getLeaders();
  }

  componentDidUpdate(prevProps) {
    const { term, industry } = this.props;
    if (term !== prevProps.term || industry !== prevProps.industry) {
      this.searchWhenStopTyping();
    }
  }

  searchWhenStopTyping = debounce(() => {
    this.props.getLeaders(null, this.props.term, this.props.industry, true);
  }, 800);

  loadNextPage = isVisible => {
    const { getLeaders, page, term } = this.props;
    if(isVisible && page) getLeaders(page, term);
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
