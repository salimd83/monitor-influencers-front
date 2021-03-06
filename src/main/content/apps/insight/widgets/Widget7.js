import React, { Component } from 'react';
import { Card, Typography, Icon } from '@material-ui/core';
import { Doughnut } from 'react-chartjs-2';
import { withStyles } from '@material-ui/core/styles/index';
import classNames from 'classnames';
import _ from 'lodash';
import Popover from '@material-ui/core/Popover';

const styles = theme => ({
  root: {},
  typography: {
    margin: theme.spacing.unit,
    fontSize: '14px'
  }
});

class Widget7 extends Component {
  state = {
    dataset: 'Today',
    anchorEl: null
  };

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null
    });
  };

  setDataSet = ev => {
    this.setState({ dataset: ev.target.value });
  };

  render() {
    const { anchorEl, dataset } = this.state;
    const { classes, data: dataRaw, popovertext, theme, size } = this.props;
    const data = _.merge({}, dataRaw);

    const dataWithColors = data.datasets[dataset].map(obj => ({
      ...obj,
      borderColor: theme.palette.divider,
      backgroundColor: [
        theme.palette.primary.dark,
        theme.palette.primary.main,
        theme.palette.primary.light
      ],
      hoverBackgroundColor: [
        theme.palette.secondary.dark,
        theme.palette.secondary.main,
        theme.palette.secondary.light
      ]
    }));

    return (
      <Card className={classNames(classes.root, 'w-full', 'h-full')}>
        <div className="p-16">
          <Typography className="h1 font-300">
            <Icon className="tooltips" onClick={this.handleClick}>
              info
            </Icon>
            Activity Type
          </Typography>
        </div>

        <div className="h-224 relative mb-8" style={{ minHeight: '256px' }}>
          <Doughnut
            data={{
              labels: data.labels,
              datasets: dataWithColors
            }}
            options={data.options}
          />
        </div>

        <div className="p-16 flex flex-row items-center justify-center">
          {data.labels.slice(0, size - 1).map((label, index) => (
            <div key={label} className="px-16 flex flex-col items-center">
              <Typography align="center" className="h4" color="textSecondary">
                {label}
              </Typography>
              <Typography align="center" className="h2 font-300 py-8">
                {data.datasets[dataset][0].data[index]}%
              </Typography>
            </div>
          ))}
        </div>
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
        >
          <Typography className={classes.typography}>{popovertext}</Typography>
        </Popover>
      </Card>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Widget7);
