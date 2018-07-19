import React, { Component } from "react";
import Widget from "../widgets/Widget5";
import dataParser from "./data/followersRateData";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { CircularProgress, Card } from "@material-ui/core";
import * as Actions from "../store/actions";

class FollowersRateCard extends Component {
  componentDidMount() {
    const { from, to } = this.props;
    this.props.getData("42ig8yrfd5jhwrmy83", from, to);
  }
  render() {
    const { loading, data } = this.props;
    const options = {
      popovertext: "the content of activity rate/engagement popover",
      data: dataParser(data),
      title: 'Followers Rates'
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
      getData: Actions.getFollowersRateData,
    },
    dispatch
  );
}

function mapStateToProps({ insightApp }) {
  return {
    data: insightApp.insight.followersRateData,
    loading: insightApp.insight.activityRateFetching,
    from: insightApp.insight.from,
    to: insightApp.insight.to
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FollowersRateCard);