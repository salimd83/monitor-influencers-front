import React, { Component } from "react";
import Widget from "../widgets/Widget10";
import dataParser from "./data/activityRateData";
import { connect } from "react-redux";
import { CircularProgress, Card } from "@material-ui/core";

class ActivityRateCard extends Component {
  render() {
    const { loading, dataRate, dataEngagement } = this.props;
    const options = {
      popovertext: dataRate.message,
      data: dataParser([dataRate.data, dataEngagement]),
      title: 'Activity & Engagement'
    };

    return (
      <React.Fragment>
        {loading ? (
          <Card style={{ textAlign: "center" }}>
            <CircularProgress className="my-16" />
          </Card>
        ) : (
          <Widget {...options} />
        )}
      </React.Fragment>
    );
  }
}

function mapStateToProps({ insightApp }) {
  return {
    dataRate: insightApp.insight.activityRateData,
    dataEngagement: insightApp.insight.activityEngagementData,
    loading: insightApp.insight.activityRateFetching,
  };
}

export default connect(
  mapStateToProps
)(ActivityRateCard);
