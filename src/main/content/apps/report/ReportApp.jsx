import React, { Component } from "react";
import { FusePageCarded } from "@fuse";
import { connect } from "react-redux";
import {
  setDateFilter,
  addProfile,
  removeProfile,
  getProfiles
} from "./store/actions/report.actions";
import { toggleInSelectedProfiles } from "../profiles/store/actions/profiles.actions";
import { showMessage } from "../../../../store/actions";
import ReportAppHeader from "./ReportAppHeader";
import ReportAppList from "./ReportAppList";
import profilesReducer from "../profiles/store/reducers/profiles.reducer";

const mapState = ({ reportApp, async, profilesApp }) => ({
  from: reportApp.from,
  to: reportApp.to,
  profiles: reportApp.profiles,
  loading: async.loading,
  selectedProfiles: profilesApp.profiles.selectedProfiles
});

const actions = {
  setDateFilter,
  addProfile,
  removeProfile,
  getProfiles,
  toggleInSelectedProfiles,
  showMessage
};

export class ReportApp extends Component {
  componentDidMount() {
    const { from, to, selectedProfiles, getProfiles } = this.props;
    if (selectedProfiles.length > 1)
      getProfiles(selectedProfiles.map(pro => pro.id), from, to);
    else {
      this.redirectToProfile();
    }
  }

  redirectToProfile = () => {
    this.props.history.push("/admin/profiles");
    this.props.showMessage({
      message: "Please select at least 2 profiles to compare",
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "left"
      }
    });
  };

  handleDateChange = (type, date) => {
    const { from, to, setDateFilter, selectedProfiles } = this.props;
    const selectedProfileIds = selectedProfiles.amp(pro => pro.id)
    type === "from"
      ? setDateFilter(date, to, selectedProfileIds)
      : setDateFilter(from, date, selectedProfileIds);
  };

  handleProfileChange = profile => {
    this.props.addProfile(profile);
    this.props.toggleInSelectedProfiles(profile);
  };

  removeProfile = profile => () => {
    const {
      selectedProfiles,
      removeProfile,
      toggleInSelectedProfiles
    } = this.props;
    removeProfile(profile.id);
    toggleInSelectedProfiles(profile);
    if (selectedProfiles.length < 2) {
      this.redirectToProfile();
    }
  };

  render() {
    const { handleDateChange, handleProfileChange } = this;
    const { from, to, profiles, loading, showMessage } = this.props;

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
              showMessage={showMessage}
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
