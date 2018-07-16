import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { WidthProvider, Responsive } from 'react-grid-layout';
import _ from 'lodash';

import {simpleStore} from '../../../../fn/simpleStore'
import Card1 from './InsightCards/Card1';
import Card2 from './InsightCards/Card2';
import ActivityTypeCard from './InsightCards/ActivityTypeCard';
import ActivityRateCard from './InsightCards/ActivityRateCard';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const cards = [
  {
    id: 'ActivityTypeCard',
    component: ActivityTypeCard,
    w: 3,
    h: 4,
    minH: 4,
    minW: 2,
    hidden: true
  },
  {
    id: 'card1',
    component: Card1,
    w: 3,
    h: 2,
    minH: 2,
    minW: 3,
    hidden: true
  },
  {
    id: 'ActivityRateCard',
    component: ActivityRateCard,
    w: 6,
    h: 4,
    minH: 4,
    minW: 4,
    hidden: true
  },
  {
    id: 'card2',
    component: Card2,
    w: 3,
    h: 2,
    minH: 2,
    minW: 3,
    hidden: true
  }
];

const initialItems = [0, 1, 2, 3].map((i, key, list) => {
  cards[i].hidden = false;
  return {
    i: i.toString(),
    x: i * cards[i].w,
    y: 0,
    w: cards[i].w,
    h: cards[i].h,
    minH: cards[i].minH,
    minW: cards[i].minW,
    add: i === (list.length - 1).toString(),
    component: cards[i].component,
    id: cards[i].id
  };
});

const originalLayouts = simpleStore.lookup('siInsightsGrid', 'simple') || {}


class InsightGrid extends Component {
  static get defaultProps() {
    return {
      className: 'layout',
    cols: {
      lg: 12,
      md: 9,
      sm: 6,
      xs: 3,
      xxs: 3
    },
    rowHeight: 100
    }
  };

  state = {
    items: initialItems,
    newCounter: initialItems.length,
    layouts: originalLayouts, // set layout to initial items tilla layout change occures
    layout: InsightGrid
  };

  createElement = (item, index) => {
    const i = item.add ? '+' : item.i;
    const Card = item.component;

    return (
      <div key={i} data-grid={item}>
        <Card size={this.state.layout[index] ? this.state.layout[index].w : 2} />
        <span className="remove" onClick={this.onRemoveItem(i)}>
          x
        </span>
      </div>
    );
  };

  onAddItem = () => {
    /*eslint no-console: 0*/
    const { newCounter, items, cols } = this.state;
    const card = cards.filter(card => card.hidden).slice(0, 1)[0];
    card.hidden = false;

    const newItem = {
      i: String(newCounter),
      x: (items.length * card.w) % (cols || 12),
      y: Infinity, // puts it at the bottom
      w: card.w,
      h: card.h,
      minH: card.minH,
      minW: card.minW,
      component: card.component,
      id: card.id
    };

    this.setState({
      // Add a new item. It must have a unique key!
      items: [...this.state.items, newItem], // Increment the counter to ensure key is always unique.
      newCounter: newCounter + 1
    });
  };

  onBreakpointChange = (breakpoint, cols) => {
    this.setState({
      breakpoint: breakpoint,
      cols: cols
    });
  };

  onLayoutChange = (layout, layouts) => {
    // this.props.onLayoutChange(layout);
    console.log('asdasd')
    simpleStore.upsert('siInsightsGrid', layouts, 'simple')
      console.log('layout to store:',  layout)
    this.setState({ layouts, layout });
    // this.props.onLayoutChange(layout); // updates status display
  };

  onRemoveItem = i => () => {
    const { items } = this.state;
    const item = items.filter(item => item.i === i)[0];
    const card = cards.filter(card => card.id === item.id)[0];
    card.hidden = true;
    this.setState({
      items: _.reject(items, { i: i })
    });
  };

  render() {
    const { newCounter, items } = this.state;
    console.log('original layout', originalLayouts)

    return (
      <div>
        <Button
          onClick={this.onAddItem}
          className="my-16 mx-16"
          variant="outlined"
          color="primary"
          disabled={items.length < cards.length ? false : true}
        >
          Add Item
        </Button>
        <ResponsiveReactGridLayout
          onBreakpointChange={this.onBreakpointChange}
          layouts={this.state.layouts}
          onLayoutChange={(layout, layouts) =>
            this.onLayoutChange(layout, layouts)
          }
          {...this.props}
        >
          {items.map((item, i) => this.createElement(item, i))}
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}

export default InsightGrid;
