import React, { Component } from "react";
import { FusePageCarded } from "@fuse";
import { connect } from "react-redux";
import ReportAppHeader from "./ReportAppHeader";
import ReportAppList from "./ReportAppList";


const mapState = ({ reportApp, async }) => ({
 
});

const actions = {
  
};

export class ReportApp extends Component {


  render() {

    return (
      <FusePageCarded
        header={
          <ReportAppHeader />
        }
        content={
          <ReportAppList />
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
)(ReportApp);
