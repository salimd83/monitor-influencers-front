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
    const { anchorEl } = this.state;
    const { classes, data: dataRaw, popovertext, theme, size } = this.props;
    const { dataset } = this.state;
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

    console.log('size', size);
    return (
      <Card className={classNames(classes.root, 'w-full')}>
        <div className="p-16">
          <Typography className="h1 font-300">
            <Icon className="tooltips" onClick={this.handleClick}>
              info
            </Icon>
            Activity Type
          </Typography>
        </div>

        <div className="h-224 relative mb-8" style={{ height: '256px' }}>
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
              <Typography className="h4" color="textSecondary">
                {label}
              </Typography>
              <Typography className="h2 font-300 py-8">
                {data.datasets[dataset][0].data[index]}%
              </Typography>

              {/* <div className="flex flex-row items-center justify-center">

                                {data.datasets[dataset][0].change[index] < 0 && (
                                    <Icon className="text-18 pr-4 text-red">
                                        arrow_downward
                                    </Icon>
                                )}

                                {data.datasets[dataset][0].change[index] > 0 && (
                                    <Icon className="text-18 pr-4 text-green">
                                        arrow_upward
                                    </Icon>
                                )}
                                <div className="h5">
                                    {data.datasets[dataset][0].change[index]}%
                                </div>
                            </div> */}
            </div>
          ))}
        </div>

        {/* <Divider className="mx-16"/> */}

        {/* <div className="p-16 flex flex-row items-center justify-between">
                    <div>
                        <FormControl className="">
                            <Select value={dataset} onChange={this.setDataSet}>
                                {Object.keys(data.datasets).map(key => (
                                    <MenuItem key={key} value={key}>{key}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <Button size="small">OVERVIEW</Button>
                </div> */}
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
          <Typography className={classes.typography}>{popovertext}</Typography>
        </Popover>
      </Card>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Widget7);
