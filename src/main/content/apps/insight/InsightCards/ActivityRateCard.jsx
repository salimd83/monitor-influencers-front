import React, { Component } from "react";
import Widget from "../widgets/Widget5";
import dataParser from "./data/activityRateData";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { CircularProgress, Card } from "@material-ui/core";
import * as Actions from "../store/actions";

class ActivityRateCard extends Component {
  componentDidMount() {
    const { from, to } = this.props;
    this.props.getRateData("42ig8yrfd5jhwrmy83", from, to);
    // this.props.getEngagementData("42ig8yrfd5jhwrmy83", from, to);
  }
  render() {
    const { loading, dataRate, dataEngagement } = this.props;
    console.log('activity', dataRate)
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getRateData: Actions.getActivityRateData,
      getEngagementData: Actions.getActivityEngagementData
    },
    dispatch
  );
}

function mapStateToProps({ insightApp }) {
  return {
    dataRate: insightApp.insight.activityRateData,
    dataEngagement: insightApp.insight.activityEngagementData,
    loading: insightApp.insight.activityRateFetching,
    from: insightApp.insight.from,
    to: insightApp.insight.to
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActivityRateCard);
