import React, { Component } from "react";
import { FusePageCarded } from "@fuse";
import { connect } from "react-redux";
import {
  setDateFilter,
  addProfile,
  removeProfile,
  getProfiles
} from "./store/actions/report.actions";
import {toggleInSelectedProfiles} from '../profiles/store/actions/profiles.actions'
import ReportAppHeader from "./ReportAppHeader";
import ReportAppList from "./ReportAppList";

const mapState = ({ reportApp, async, profilesApp }) => ({
  from: reportApp.from,
  to: reportApp.to,
  profiles: reportApp.profiles,
  loading: async.loading,
  selectedProfileIds: profilesApp.profiles.selectedProfileIds,
});

const actions = {
  setDateFilter,
  addProfile,
  removeProfile,
  getProfiles,
  toggleInSelectedProfiles
};

export class ReportApp extends Component {
  componentDidMount() {
    if (this.props.selectedProfileIds.length > 0)
      this.props.getProfiles(this.props.selectedProfileIds);
  }
  handleDateChange = (type, date) => {
    const { from, to, setDateFilter } = this.props;
    type === "from" ? setDateFilter(date, to) : setDateFilter(from, date);
  };

  handleProfileChange = profile => {
    this.props.addProfile(profile);
    this.props.toggleInSelectedProfiles(profile.id)
  };

  removeProfile = id => () => {
    this.props.removeProfile(id);
    this.props.toggleInSelectedProfiles(id)
  };

  render() {
    const { handleDateChange, handleProfileChange } = this;
    const { from, to, profiles, loading } = this.props;

    return (
      <div id="report-app">
        <FusePageCarded
          header={
            <ReportAppHeader
              {...{ from, to, handleDateChange, profiles, handleProfileChange }}
            />
          }
          content={
            <ReportAppList
              profiles={profiles}
              removeProfile={this.removeProfile}
              loading={loading}
            />
          }
          sidebarInner
          onRef={instance => {
            this.pageLayout = instance;
          }}
        />
      </div>
    );
  }
}

export default connect(
  mapState,
  actions
)(ReportApp);
