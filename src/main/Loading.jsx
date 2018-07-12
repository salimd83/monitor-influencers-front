import React from 'react';
import { connect } from 'react-redux';
import { Backdrop, CircularProgress } from '@material-ui/core';

const mapState = state => ({
  loading: state.async.loading,
  autoLoader: state.async.autoLoader
});

const Loading = ({ loading, autoLoader }) => {
  console.log(loading);
  return (
    <div>
      {loading && autoLoader && (
        <div id="loader">
          <div className="spinner">
            <CircularProgress thickness={4} size={30} color="primary" />
          </div>
        </div>
      )}
    </div>
  );
};

export default connect(mapState)(Loading);
