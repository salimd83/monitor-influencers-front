import React, { Component } from 'react';
import { Card, Icon, Typography } from '@material-ui/core';
import { Bar } from 'react-chartjs-2';
import { withStyles } from '@material-ui/core/styles/index';
import classNames from 'classnames';
import Popover from '@material-ui/core/Popover';

const styles = theme => ({
  root: {},
  typography: {
    margin: theme.spacing.unit,
    fontSize: '14px'
  }
});

class Widget2 extends Component {
  state = {
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
  render() {
    const { classes, data, theme, ...restProps } = this.props;
    const dataWithColors = data.datasets.map(obj => ({
      ...obj,
      borderColor: theme.palette.secondary.main,
      backgroundColor: theme.palette.secondary.main
    }));
    const { anchorEl } = this.state;
    return (
      <Card {...restProps}>
        <div className="p-16 pb-0 flex flex-row flex-wrap items-end">
          <div className="pr-16">
            <Typography className="h3" color="textSecondary">
              Conversion{' '}
              <Icon
                style={{ fontSixe: '21px', verticalAlign: 'middle' }}
                onClick={this.handleClick}
              >
                info
              </Icon>
            </Typography>
            <Typography className="text-56 font-300 leading-none mt-8">
              {data.conversion.value}
            </Typography>
          </div>

          <div className="py-4 text-16 flex flex-row items-center">
            <div className="flex flex-row items-center">
              {data.conversion.ofTarget > 0 && (
                <Icon className="text-green mr-4">trending_up</Icon>
              )}
              {data.conversion.ofTarget < 0 && (
                <Icon className="text-red mr-4">trending_down</Icon>
              )}
              <Typography>{data.conversion.ofTarget}%</Typography>
            </div>
            <Typography className="ml-4 whitespace-no-wrap">
              of target
            </Typography>
          </div>
        </div>

        <div className="h-96 w-100-p" style={{ height: 105 }}>
          <Bar
            data={{
              labels: data.labels,
              datasets: dataWithColors
            }}
            options={data.options}
          />
        </div>

        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
        >
          <Typography className={classes.typography}>
            The content of the Popover.
          </Typography>
        </Popover>
      </Card>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Widget2);
