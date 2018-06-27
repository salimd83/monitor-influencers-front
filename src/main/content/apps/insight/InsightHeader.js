import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles/index';
import classNames from 'classnames';
import { Icon, Typography, TextField, IconButton } from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from './store/actions';

class InsightHeader extends Component {
  state = {
    dateFrom: inputDateFormat(),
    dateTo: inputDateFormat(1)
  };

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

  handleClick = () => {
    this.props.setDate(this.state.dateFrom, this.state.dateTo);
  };

  render() {
    const { classes } = this.props;
    return (
      <div
        className={classNames(
          classes.root,
          'flex flex-1 flex-col sm:flex-row items-center justify-between p-24'
        )}
      >
        <div className="flex flex-1 items-center">
          <div className="flex items-center">
            <FuseAnimate animation="transition.expandIn" delay={300}>
              <Icon className="text-32 mr-12">account_box</Icon>
            </FuseAnimate>
            <FuseAnimate animation="transition.slideLeftIn" delay={300}>
              <Typography variant="title">Insights</Typography>
            </FuseAnimate>
          </div>
        </div>

        <div className="flex items-end">
          <FuseAnimate animation="transition.slideLeftIn" delay={300}>
            <React.Fragment>
              <TextField
                id="date"
                label="From"
                name="from"
                onChange={this.handleChange}
                type="date"
                defaultValue={this.state.dateFrom}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true
                }}
              />
              <TextField
                id="date"
                label="To"
                name="to"
                onChange={this.handleChange}
                type="date"
                defaultValue={this.state.dateTo}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true
                }}
              />
              <IconButton aria-label="Delete">
                <Icon style={{marginTop: '14px'}}>check_circle</Icon>
              </IconButton>
            </React.Fragment>
          </FuseAnimate>
        </div>
      </div>
    );
  }
}

function inputDateFormat(addDay = 0) {
  var x = new Date();
  var y = x.getFullYear().toString();
  var m = (x.getMonth() + 1).toString();
  var d = (x.getDate() + addDay).toString();
  d.length == 1 && (d = '0' + d);
  m.length == 1 && (m = '0' + m);
  var yyyymmdd = `${y}-${m}-${d}`;
  return yyyymmdd;
}

const styles = theme => ({
  root: {}
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
