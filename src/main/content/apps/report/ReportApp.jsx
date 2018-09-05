import React, { Component } from "react";
import { FusePageCarded } from "@fuse";
import { connect } from "react-redux";
import {
  setDateFilter,
  addProfile,
  removeProfile
} from "./store/actions/report.actions";
import ReportAppHeader from "./ReportAppHeader";
import ReportAppList from "./ReportAppList";

const mapState = ({ reportApp, async }) => ({
  from: reportApp.from,
  to: reportApp.to,
  profiles: reportApp.profiles,
  loading: async.loading
});

const actions = {
  setDateFilter,
  addProfile,
  removeProfile
};

export class ReportApp extends Component {
  handleDateChange = (type, date) => {
    const { from, to, setDateFilter } = this.props;
    type === "from" ? setDateFilter(date, to) : setDateFilter(from, date);
  };

  handleProfileChange = profile => {
    this.props.addProfile(profile);
  };

  removeProfile = id => () => {
    this.props.removeProfile(id);
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
