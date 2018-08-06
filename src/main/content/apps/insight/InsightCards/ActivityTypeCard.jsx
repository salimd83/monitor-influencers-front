import React, { Component } from 'react';
import Widget from '../widgets/Widget7';
import dataParser from './data/activityTypeData';
import { connect } from 'react-redux';
import { CircularProgress, Card } from '@material-ui/core';

class ActivityTypeCard extends Component {

  render() {
    const { loading, data, size } = this.props;
    const options = {
      popovertext: data.message,
      data: dataParser(data.data),
      title: 'activities Types'
    };

    return (
      <React.Fragment>
        {loading ? (
          <Card style={{ textAlign: 'center' }}>
            <CircularProgress className="my-16" />
          </Card>
        ) : (
          <Widget {...options} size={size} />
        )}
      </React.Fragment>
    );
  }
}

function mapStateToProps({ insightApp }) {
  return {
    data: insightApp.insight.activityData,
    loading: insightApp.insight.activityFetching
  };
}

export default connect(
  mapStateToProps
)(ActivityTypeCard);
