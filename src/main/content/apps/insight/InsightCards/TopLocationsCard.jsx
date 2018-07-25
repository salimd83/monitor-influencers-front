import React, { Component } from "react";
import Widget from "../widgets/Widget9";
import dataParser from "./data/topLocationsData";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { CircularProgress, Card } from "@material-ui/core";
import * as Actions from "../store/actions";

class TopLocationsCard extends Component {
  render() {
    const { loading, data } = this.props;
    const options = {
      popovertext: data.message,
      data: dataParser(data.data ? data.data : []),
      title: "Top Locations",
      name: "Locations"
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
    data: insightApp.insight.topLocationsData,
    loading: insightApp.insight.topLocationsFetching
  };
}

export default connect(mapStateToProps)(TopLocationsCard);
