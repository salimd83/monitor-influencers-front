import React, { Component } from 'react';
import GridLayout from 'react-grid-layout';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { WidthProvider, Responsive } from 'react-grid-layout';
import _ from 'lodash';

import Widget2 from './widgets/Widget2';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

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

class InsightGrid extends Component {
  state = {
    items: [0, 1, 2, 3].map((i, key, list) => {
      return {
        i: i.toString(),
        x: i * 3,
        y: 0,
        w: 3,
        h: 2,
        add: i === (list.length - 1).toString()
      };
    }),
    newCounter: 0
  };

  static defaultProps = {
    className: 'layout',
    cols: { lg: 12, md: 9, sm: 6, xs: 3, xxs: 3 },
    rowHeight: 100
  };

  createElement = el => {
    const removeStyle = {
      position: 'absolute',
      right: '2px',
      top: 0,
      cursor: 'pointer'
    };
    const i = el.add ? '+' : el.i;
    return (
      <div key={i} data-grid={el}>
        <Widget2 data={widget2} popoverText="the content of the popover" />
        <span
          className="remove"
          style={removeStyle}
          onClick={this.onRemoveItem.bind(this, i)}
        >
          x
        </span>
      </div>
    );
  };

  onAddItem = () => {
    /*eslint no-console: 0*/
    console.log('adding', 'n' + this.state.newCounter);
    const newItem = {
      i: 'n' + this.state.newCounter,
      x: (this.state.items.length * 3) % (this.state.cols || 12),
      y: Infinity, // puts it at the bottom
      w: 3,
      h: 2
    };
    this.setState({
      // Add a new item. It must have a unique key!
      items: [...this.state.items, newItem],
      // Increment the counter to ensure key is always unique.
      newCounter: this.state.newCounter + 1
    });
  };

  onBreakpointChange = (breakpoint, cols) => {
    this.setState({
      breakpoint: breakpoint,
      cols: cols
    });
  };

  onLayoutChange = layout => {
    // this.props.onLayoutChange(layout);
    this.setState({ layout: layout });
  };

  onRemoveItem = i => {
    console.log('removing', i);
    this.setState({ items: _.reject(this.state.items, { i: i }) });
  };

  render() {
    const { classes } = this.props;
    let layout = [
      { i: 'a', x: 0, y: 0, w: 4, h: 6, minH: 6, maxH: 6 },
      { i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
      { i: 'c', x: 4, y: 0, w: 1, h: 2 }
    ];
    return (
      <div>
        <Button onClick={this.onAddItem} className={classes.button} variant="outlined" color="primary">
          Add Item
        </Button>
        <ResponsiveReactGridLayout
          onLayoutChange={this.onLayoutChange}
          onBreakpointChange={this.onBreakpointChange}
          {...this.props}
        >
          {_.map(this.state.items, el => this.createElement(el))}
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}

const styles = theme => ({
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  button: {
    margin: theme.spacing.unit,
  }
});

export default withStyles(styles, { withTheme: true })(InsightGrid);
