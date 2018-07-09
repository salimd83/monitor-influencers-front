import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles/index';
import { Icon, Typography, IconButton, Grid } from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from './store/actions';
import 'react-select/dist/react-select.css';
import { FuseUtils } from '@fuse'

import ProfileFilter from './filters/ProfileFilter';
import DateFilter from './filters/DateFilter';

class InsightHeader extends Component {
  state = {
    from: FuseUtils.currentDateFormat(0, -1),
    to: FuseUtils.currentDateFormat(),
    selectedProfile: '42ig8yrfd5jhwrmy83'
  };
  handleDateFromChange = from => this.setState({from})
  handleDateToChange = to => this.setState({to})
  handleProfileChange = profile => {
    this.setState({ selectedProfile: profile.value });
  };
  handleClick = () => {
    const { from, to, selectedProfile } = this.state;
    this.props.setDate(selectedProfile, from, to);
  };

  componentDidMount() {
    const { from, to, selectedProfile } = this.state;
    this.props.setDate(selectedProfile, from, to, false);
  }

  render() {
    const { selectedProfile, to, from } = this.state;
    const { handleDateFromChange, handleDateToChange, handleClick } = this;
    return (
      <Grid
        container
        spacing={16}
        alignItems="center"
        direction="row"
        justify="space-between"
        id="insightHeader"
      >
        <Grid item>
          <div className="flex items-center">
            <FuseAnimate animation="transition.expandIn" delay={300}>
              <Icon className="text-32 mr-12">account_box</Icon>
            </FuseAnimate>
            <FuseAnimate animation="transition.slideLeftIn" delay={300}>
              <Typography variant="title">Insights</Typography>
            </FuseAnimate>
          </div>
        </Grid>
        <Grid item>
          <FuseAnimate animation="transition.slideLeftIn" delay={300}>
            <Grid container spacing={16} alignItems="center" direction="row">
              <Grid item>
                <DateFilter
                  {...{
                    to,
                    from,
                    handleDateFromChange,
                    handleDateToChange
                  }}
                  maxFrom={FuseUtils.currentDateFormat(-1)}
                  maxTo={FuseUtils.currentDateFormat()}
                />
              </Grid>
              <Grid item>
                <ProfileFilter handleChange={this.handleProfileChange} selected={selectedProfile} />
              </Grid>
              <Grid>
                <IconButton onClick={handleClick} aria-label="Delete">
                  <Icon>check_circle</Icon>
                </IconButton>
              </Grid>
            </Grid>
          </FuseAnimate>
        </Grid>
      </Grid>
    );
  }
}

const styles = theme => ({
  root: {
    flexGrow: 1
  }
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setDate: Actions.setDate
    },
    dispatch
  );
}

export default withStyles(styles, { withTheme: true })(
  connect(
    null,
    mapDispatchToProps
  )(InsightHeader)
);
