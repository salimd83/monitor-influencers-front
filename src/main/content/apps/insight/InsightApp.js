import React, { Component } from "react";
import { FusePageCarded } from "@fuse";
import { connect } from "react-redux";
import { setFilters } from "./store/actions";
import moment from "moment";
import { simpleCall } from "fn/simpleCall.js";

import InsightHeader from "./InsightHeader";
import InsightGrid from "./InsightGrid";

const actions = {
  setFilters
};

const mapState = ({ insightApp }) => ({
  from: insightApp.insight.from,
  to: insightApp.insight.to,
  profile: insightApp.insight.profile
});

class InsightApp extends Component {
  async componentDidMount() {
    const { match, setFilters } = this.props;
    const id = match.params.id || "42ig8yrfd5jhwrmy83";
    const from =
      match.params.from ||
      moment()
        .add(-1, "months")
        .toISOString();
    const to = match.params.to || moment().toISOString();
    try {
      const response = await simpleCall("get", `si/profiles/${id}`);

      const profile = {
        value: response.data.id,
        label: `${response.data.first_name} ${response.data.last_name}`
      };

      setFilters(profile, from, to);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { from, to, profile, setFilters } = this.props;
    return (
      <FusePageCarded
        header={<InsightHeader {...{ from, to, profile, setFilters }} />}
        content={<InsightGrid />}
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
)(InsightApp);
