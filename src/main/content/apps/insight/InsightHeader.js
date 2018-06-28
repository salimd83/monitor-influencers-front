import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles/index';
import { Icon, Typography, IconButton, Grid } from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from './store/actions';
import 'react-select/dist/react-select.css';

import ProfileFilter from './filters/ProfileFilter';
import DateFilter from './filters/DateFilter';

class InsightHeader extends Component {
  state = {
    from: inputDateFormat(0, -1),
    to: inputDateFormat(),
    selectedProfile: '42ig8yrfd5jhwrmy83'
  };

  componentDidMount() {
    const { from, to, selectedProfile } = this.state;
    this.props.setDate(selectedProfile, from, to, false);
  }

  handleChange = event => {
    this.setState(
      _.set(
        { ...this.state },
        event.target.name,
        event.target.type === 'checkbox'
          ? event.target.checked
          : event.target.value
      )
    );
  };

  handleProfileChange = profile => {
    this.setState({ selectedProfile: profile.value });
  };

  handleClick = () => {
    const { from, to, selectedProfile } = this.state;
    this.props.setDate(selectedProfile, from, to);
  };

  render() {
    const { selectedProfile, to, from } = this.state;
    const { handleChange, handleClick } = this;
    return (
      <Grid
        container
        spacing={16}
        alignItems="center"
        direction="row"
        justify="space-between"
        style={{ height: 'calc(100% + 16px)', zIndex: '1000' }}
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
                <ProfileFilter
                  handleChange={this.handleProfileChange}
                  selected={selectedProfile}
                />
              </Grid>
              <Grid item>
                <DateFilter
                  {...{ to, from, handleChange }}
                  maxFrom={inputDateFormat(-1)}
                  maxTo={inputDateFormat()}
                />
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

function inputDateFormat(addDays = 0, addMonths = 0) {
  var x = new Date();
  var y = x.getFullYear().toString();
  var m = (x.getMonth() + 1 + addMonths).toString();
  var d = (x.getDate() + addDays).toString();
  d.length === 1 && (d = '0' + d);
  m.length === 1 && (m = '0' + m);
  var yyyymmdd = `${y}-${m}-${d}`;
  return yyyymmdd;
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
