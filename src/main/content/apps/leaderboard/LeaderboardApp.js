import React, { Component } from "react";
import { connect } from "react-redux";
import { FusePageCarded } from "@fuse";
import { getLeaders, setTerm, setIndustry, setGender, setLanguage, setTags } from "./store/actions/leaderboard.actions";
import {
  toggleInSelectedProfiles,
  selectAllProfiles,
  deSelectAllProfiles
} from "../profiles/store/actions/profiles.actions";
import { debounce } from "lodash";

import IndustriesFilter from "./filters/IndustriesFilter";
import TermFilter from "./filters/TermFilter";
import GenderFilter from "./filters/GenderFilter";
import LanguageFilter from "./filters/LanguageFilter";
import TagsFilter from "./filters/TagsFilter";
import LeaderboardHeader from "./LeaderboardHeader";
import LeaderboardList from "./LeaderboardList";

const mapState = ({ leaderboardApp, profilesApp }) => ({
  profiles: leaderboardApp.leaderboard.profiles,
  term: leaderboardApp.leaderboard.term,
  gender: leaderboardApp.leaderboard.gender,
  industry: leaderboardApp.leaderboard.industry,
  language: leaderboardApp.leaderboard.language,
  tags: leaderboardApp.leaderboard.tags,
  page: leaderboardApp.leaderboard.page,
  loading: leaderboardApp.leaderboard.fetching,
  selectedProfiles: profilesApp.profiles.selectedProfiles
});

const actions = {
  getLeaders,
  setTerm,
  setIndustry,
  setGender,
  setLanguage,
  setTags,
  toggleInSelectedProfiles,
  deSelectAllProfiles,
  selectAllProfiles,
};

export class LeaderboardApp extends Component {
  componentDidMount() {
    if (this.props.profiles.length === 0) {
      this.props.getLeaders();
    }
  }

  componentDidUpdate(prevProps) {
    const { term, industry, language, tags } = this.props;
    if (term !== prevProps.term || industry !== prevProps.industry || language !== prevProps.language || tags !== prevProps.tags) {
      this.searchWhenStopTyping();
    }
  }

  searchWhenStopTyping = debounce(() => {
    const { getLeaders, term, industry, language, tags } = this.props;
    getLeaders(null, term, industry.value, language, tags.map(t => t.id).join(','), true);
  }, 800);

  loadNextPage = isVisible => {
    const { getLeaders, page, term, language, tags } = this.props;
    if (isVisible && page) getLeaders(page, term, language, tags.map(t => t.id).join(',') );
  };

  selectAllProfiles = () => {
    this.props.selectAllProfiles(this.props.profiles)
  }

  render() {
    const {
      profiles,
      term,
      setTerm,
      setIndustry,
      industry,
      setGender,
      gender,
      language,
      setLanguage,
      tags,
      setTags,
      page,
      loading,
      selectedProfiles,
      toggleInSelectedProfiles,
      deSelectAllProfiles
    } = this.props;
    const {selectAllProfiles} = this;
    const termFilter = <TermFilter setTerm={setTerm} term={term} />;
    const industriesFilter = <IndustriesFilter setIndustry={setIndustry} industry={industry} />;
    const genderFilter = <GenderFilter gender={gender} setGender={setGender} />;
    const languageFilter = <LanguageFilter language={language} setLanguage={setLanguage} />
    const tagsFilter = <TagsFilter tags={tags} setTags={setTags} />

    return (
      <FusePageCarded
        header={
          <LeaderboardHeader
            {...{
              selectAllProfiles,
              deSelectAllProfiles,
              termFilter,
              industriesFilter,
              selectedProfiles,
              genderFilter,
              languageFilter,
              tagsFilter,
            }}
          />
        }
        content={
          <LeaderboardList
            loading={loading}
            profiles={profiles}
            loadNextPage={this.loadNextPage}
            page={page}
            toggleInSelectedProfiles={toggleInSelectedProfiles}
            selectedProfiles={selectedProfiles}
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
