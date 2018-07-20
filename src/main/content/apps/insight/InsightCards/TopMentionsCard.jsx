import React, { Component } from "react";
import Widget from "../widgets/Widget9";
import dataParser from "./data/topMentionsData";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { CircularProgress, Card } from "@material-ui/core";
import * as Actions from "../store/actions";

class TopMentionsCard extends Component {
  componentDidMount() {
    const { from, to } = this.props;
    this.props.getData("42ig8yrfd5jhwrmy83", from, to);
  }
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getData: Actions.getTopMentionsData
    },
    dispatch
  );
}

function mapStateToProps({ insightApp }) {
  return {
    data: insightApp.insight.topMentionsData,
    loading: insightApp.insight.topMentionsFetching,
    from: insightApp.insight.from,
    to: insightApp.insight.to
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopMentionsCard);
