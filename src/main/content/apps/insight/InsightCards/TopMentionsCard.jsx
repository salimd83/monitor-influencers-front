import React, { Component } from "react";
import Widget from "../widgets/Widget9";
import dataParser from "./data/topMentionsData";
import { connect } from "react-redux";
import { CircularProgress, Card } from "@material-ui/core";

class TopMentionsCard extends Component {
  render() {
    const { loading, data } = this.props;
    const options = {
      popovertext: data.message,
      data: dataParser(data.data ? data.data : []),
      title: "Top Mentions",
      name: "Mentions"
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
    data: insightApp.insight.topMentionsData,
    loading: insightApp.insight.topMentionsFetching
  };
}

export default connect(
  mapStateToProps
)(TopMentionsCard);
