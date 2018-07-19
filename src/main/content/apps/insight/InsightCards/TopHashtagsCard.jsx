import React, { Component } from "react";
import Widget from "../widgets/Widget9";
import dataParser from "./data/topHashtagsData";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { CircularProgress, Card } from "@material-ui/core";
import * as Actions from "../store/actions";

class TopHashtagsCard extends Component {
  componentDidMount() {
    const { from, to } = this.props;
    this.props.getData("42ig8yrfd5jhwrmy83", from, to);
  }
  render() {
    const { loading, data } = this.props;
    const options = {
      popovertext: "the content of activity rate/engagement popover",
      data: dataParser(data),
      title: 'Top Hashtags',
      name: 'Hashtags'
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
      getData: Actions.getTopHashtagsData,
    },
    dispatch
  );
}

function mapStateToProps({ insightApp }) {
  return {
    data: insightApp.insight.topHashtagsData,
    loading: insightApp.insight.topHashtagsFetching,
    from: insightApp.insight.from,
    to: insightApp.insight.to
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopHashtagsCard);
