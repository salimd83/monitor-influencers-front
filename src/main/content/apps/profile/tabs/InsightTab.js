import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles/index';
import {
  Grid,
  Paper,
  Typography,
  TextField
} from '@material-ui/core';
import { FuseAnimateGroup } from '@fuse';
import _ from 'lodash';

import Widget2 from '../widgets/Widget2';

const widget2 = {
  conversion: {
    value: 492,
    ofTarget: 13
  },
  chartType: 'bar',
  datasets: [
    {
      label: 'Conversion',
      data: [221, 428, 492, 471, 413, 344, 294]
    }
  ],
  labels: [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ],
  options: {
    spanGaps: false,
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 24,
        left: 16,
        right: 16,
        bottom: 16
      }
    },
    scales: {
      xAxes: [
        {
          display: false
        }
      ],
      yAxes: [
        {
          display: false,
          ticks: {
            min: 100,
            max: 500
          }
        }
      ]
    }
  }
};

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary
  },
  typography: {
    margin: theme.spacing.unit,
    fontSize: '14px'
  }
});

class InsightTab extends Component {
  state = {
    dateFrom: Date.now(),
    dateTo: Date.now() + 1
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

  render() {
    const { classes } = this.props;

      return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <FuseAnimateGroup
              enter={{
                animation: 'transition.slideUpBigIn'
              }}
            >
              <Paper className={classes.paper}>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography variant="headline" component="h3">
                      Profile Insight
                    </Typography>
                  </Grid>
                  <Grid item xs={6} style={{ textAlign: 'right' }}>
                    <TextField
                      id="date"
                      label="From"
                      name="from"
                      onChange={this.handleChange}
                      type="date"
                      defaultValue={this.state.from}
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
                      defaultValue={this.state.to}
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </FuseAnimateGroup>
          </Grid>
        </Grid>

        <Grid container spacing={24}>
          <Grid item xs={4}>
            <FuseAnimateGroup
              enter={{
                animation: 'transition.slideUpBigIn'
              }}
            >
              <Widget2
                data={widget2}
                popoverText="the content of the popover"
              />
            </FuseAnimateGroup>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(InsightTab);
