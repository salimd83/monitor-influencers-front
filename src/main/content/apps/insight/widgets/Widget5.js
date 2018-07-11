import React, { Component } from 'react';
import { Icon, Card, Typography } from '@material-ui/core';
import { Line } from 'react-chartjs-2';
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

class Widget5 extends Component {
  state = {
    dataset: 'today',
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

  setDataSet = dataset => {
    this.setState({ dataset });
  };

  render() {
    const { classes, data: dataRaw, theme, popovertext } = this.props;
    const { dataset, anchorEl } = this.state;

    const data = _.merge({}, dataRaw);
    const dataWithColors = data.datasets[dataset].map((obj, index) => {
      const palette = theme.palette[index === 0 ? 'primary' : 'secondary'];
      return {
        ...obj,
        borderColor: palette.main,
        backgroundColor: palette.main,
        pointBackgroundColor: palette.dark,
        pointHoverBackgroundColor: palette.main,
        pointBorderColor: palette.contrastText,
        pointHoverBorderColor: palette.contrastText
      };
    });
    return (
      <Card className={classNames(classes.root, 'w-full', 'h-full')}>
        <div className="relative p-24 flex flex-row items-center justify-between">
          <div className="flex flex-col">
            <Icon className="tooltips" onClick={this.handleClick}>
              info
            </Icon>
            <Typography className="h2">Activity Rate & Engagement</Typography>
          </div>
          {/* <div className="flex flex-row items-center">
                        {Object.keys(data.datasets)
                               .map((key) => (<Button
                                   key={key}
                                   className="py-8 px-12"
                                   size="small"
                                   onClick={() => this.setDataSet(key)}
                                   disabled={key === dataset}
                               >
                                   {key}
                               </Button>))}
                    </div> */}
        </div>

        <Typography className="relative pb-16" style={{ minHeight: '347px' }}>
          <Line
            data={{
              labels: data.labels,
              datasets: dataWithColors
            }}
            options={data.options}
          />
        </Typography>
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

export default withStyles(styles, { withTheme: true })(Widget5);
