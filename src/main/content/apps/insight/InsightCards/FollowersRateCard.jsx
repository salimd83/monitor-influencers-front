import React, { Component } from "react";
import Widget from "../widgets/Widget5";
import dataParser from "./data/followersRateData";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { CircularProgress, Card } from "@material-ui/core";
import * as Actions from "../store/actions";

class FollowersRateCard extends Component {
  // componentDidMount() {
  //   const { from, to } = this.props;
  //   this.props.getData("42ig8yrfd5jhwrmy83", from, to);
  // }
  render() {
    const { loading, data } = this.props;
    const options = {
      popovertext: data.message,
      data: dataParser(data.data),
      title: "Followers Rates"
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
    data: insightApp.insight.followersRateData,
    loading: insightApp.insight.activityRateFetching
  };
}

export default connect(mapStateToProps)(FollowersRateCard);
