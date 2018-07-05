import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { WidthProvider, Responsive } from 'react-grid-layout';
import _ from 'lodash';

import Card1 from './InsightCards/Card1';
import Card2 from './InsightCards/Card2';
import ActivityTypeCard from './InsightCards/ActivityTypeCard';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const cards = [
  {
    component: Card1,
    w: 3,
    h: 2,
    minH: 2
  },
  {
    component: Card2,
    w: 3,
    h: 2,
    minH: 2
  },
  {
    component: ActivityTypeCard,
    w: 4,
    h: 4,
    minH: 4
  }
];

const initialItems = [0, 1].map((i, key, list) => {
  return {
    i: i.toString(),
    x: i * 3,
    y: 0,
    w: cards[i].w,
    h: cards[i].h,
    minH: cards[i].minH,
    add: i === (list.length - 1).toString()
  };
});

class InsightGrid extends Component {
  static defaultProps = {
    className: 'layout',
    cols: {
      lg: 12,
      md: 9,
      sm: 6,
      xs: 3,
      xxs: 3
    },
    rowHeight: 100
  };

  state = {
    items: initialItems,
    newCounter: 2,
    layout: initialItems // set layout to initial items tilla layout change occures
  };
  createElement = el => {
    const removeStyle = {
      position: 'absolute',
      right: '2px',
      top: 0,
      cursor: 'pointer'
    };
    const i = el.add ? '+' : el.i;
    const Card = cards[Number(el.i)].component;

    return (
      <div key={i} data-grid={el}>
        <Card size={this.state.layout[el.i].w} />
        <span className="remove" style={removeStyle} onClick={this.onRemoveItem.bind(this, i)}>
          x
        </span>
      </div>
    );
  };

  onAddItem = () => {
    /*eslint no-console: 0*/
    console.log('adding', 'n' + this.state.newCounter);
    const { newCounter, items, cols } = this.state;
    const newItem = {
      i: String(newCounter),
      x: (items.length * 3) % (cols || 12),
      y: Infinity, // puts it at the bottom
      w: cards[newCounter].w,
      h: cards[newCounter].h,
      minH: cards[newCounter].minH
    };
    this.setState({
      // Add a new item. It must have a unique key!
      items: [...items, newItem], // Increment the counter to ensure key is always unique.
      newCounter: newCounter + 1,
      layout: [...items, newItem]
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
    const { newCounter, items } = this.state;
    this.setState({
      items: _.reject(items, { i: i }),
      newCounter: newCounter - 1
    });
  };

  render() {
    const { classes } = this.props;
    const { newCounter, items } = this.state;

    return (
      <div>
        <Button
          onClick={this.onAddItem}
          className={classes.button}
          variant="outlined"
          color="primary"
          disabled={Number(newCounter) < 3 ? false : true}
        >
          Add Item
        </Button>
        <ResponsiveReactGridLayout
          onLayoutChange={this.onLayoutChange}
          onBreakpointChange={this.onBreakpointChange}
          {...this.props}
        >
          {_.map(items, el => this.createElement(el))}
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
    margin: theme.spacing.unit
  }
});

export default withStyles(styles, { withTheme: true })(InsightGrid);
