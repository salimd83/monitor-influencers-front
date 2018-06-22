import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles/index';
import axios from 'axios/index';
import {
  GridList,
  Grid,
  Paper,
  GridListTile,
  GridListTileBar,
  Icon,
  IconButton,
  Typography,
  ListSubheader,
  TextField
} from '@material-ui/core';
import classNames from 'classnames';
import { FuseAnimateGroup } from '@fuse';
import _ from 'lodash';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary
  }
});

class InsightTab extends Component {
  state = {
    dateFrom: Date.now(),
    dateTo: Date.now() + 1
  };

  componentDidMount() {
    axios.get('/api/profile/photos-videos').then(res => {
      this.setState({ photosVideos: res.data });
    });
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

  render() {
    const { classes } = this.props;
    const { photosVideos } = this.state;

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
              <Paper className={classes.paper}>
                <div className="pr-16">
                  <Typography className="h3" color="textSecondary">
                    Conversion
                  </Typography>
                  <Typography className="text-56 font-300 leading-none mt-8">
                    567
                  </Typography>
                </div>
              </Paper>
            </FuseAnimateGroup>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(InsightTab);
