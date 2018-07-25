import React, { Component } from "react";
import { FusePageCarded } from "@fuse";
import { connect } from "react-redux";
import MediaAppHeader from "./MediaAppHeader";
import MediaAppList from "./MediaAppList";

const mapState = ({ mediaApp }) => ({
  from: mediaApp.from,
  to: mediaApp.to,
  profile: mediaApp.profile
});

export class MediaApp extends Component {
  fromChange = () => {};
  toChange = () => {};

  render() {
    const { from, to, profile } = this.props;
    const { fromChange, toChange } = this;

    return (
      <FusePageCarded
        header={<MediaAppHeader {...{ from, to, fromChange, toChange }} />}
        content={<MediaAppList />}
        sidebarInner
        onRef={instance => {
          this.pageLayout = instance;
        }}
      />
    );
  }
}

export default connect(mapState)(MediaApp);
