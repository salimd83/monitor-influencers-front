import React, { Component } from "react";
import { Button, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";

import { simpleStore } from "../../../../fn/simpleStore";
import initLayout from "./initLayout";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const cards = initLayout;

const originalLayouts = simpleStore.lookup("siInsightsGrid2", "simple") || {};
let breakpoint;
if (window.innerWidth >= 1200) {
  breakpoint = "lg";
} else if (window.innerWidth >= 996) {
  breakpoint = "md";
} else if (window.innerWidth >= 768) {
  breakpoint = "sm";
} else if (window.innerWidth >= 480) {
  breakpoint = "xs";
} else {
  breakpoint = "xxs";
}
let dummyArray = [0, 1, 2, 3, 4, 5];
if (originalLayouts[breakpoint]) {
  dummyArray = originalLayouts[breakpoint].map((it, index) => index);
}

const initialItems = dummyArray.map((i) => {
  return cards[i];
});

class InsightGrid extends Component {
  static get defaultProps() {
    return {
      className: "layout",
      cols: {
        lg: 12,
        md: 9,
        sm: 6,
        xs: 3,
        xxs: 3
      },
      rowHeight: 100
    };
  }

  state = {
    items: initialItems,
    newCounter: initialItems.length,
    layouts: originalLayouts, // set layout to initial items tilla layout change occures
    layout: originalLayouts[breakpoint]
  };

  componentWillMount() {
    const layouts = simpleStore.lookup("siInsightsGrid2", "simple") || {}
    // this.setState({ layouts });
    this.setState({
      layouts,
      items: cards.filter(card => layouts[breakpoint].map(layout => layout.i).includes(card.i))
    })
  }

  componentWillUnmount() {
    simpleStore.upsert("siInsightsGrid2", this.state.layouts, "simple");
  }

  createElement = (item, index) => {
    const i = item.i;
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

  onAddItem = (e) => {
    /*eslint no-console: 0*/
    const id = e.target.value;
    const { newCounter, items, cols } = this.state;
    const card = cards.filter(card => card.id === id)[0];

    const newItem = {
      i: String(newCounter),
      x: 0,
      y: 0, // puts it at the bottom
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
    simpleStore.upsert("siInsightsGrid2", layouts, "simple");
    this.setState({ layouts, layout });
    // this.props.onLayoutChange(layout); // updates status display
  };

  onRemoveItem = i => () => {
    const { items } = this.state;
    const item = items.filter(item => item.i === i)[0];
    const card = cards.filter(card => card.id === item.id)[0];
    this.setState({
      items: _.reject(items, { i: i })
    });
  };

  render() {
    const { items } = this.state;
    const hiddenItems = cards.filter(card => !items.some(item => item.i === card.i));
    return (
      <div>
        <FormControl className="my-16 mx-16">
          <InputLabel>Charts:</InputLabel>
          <Select value="" onChange={this.onAddItem} style={{width: '200px'}}>
            {hiddenItems.map(item => (
              <MenuItem key={item.id} value={item.id}>
                {item.id}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* <Button
          onClick={this.onAddItem}
          className="my-16 mx-16"
          variant="outlined"
          color="primary"
          disabled={items.length < cards.length ? false : true}
        >
          Add Item
        </Button> */}
        <ResponsiveReactGridLayout
          onBreakpointChange={this.onBreakpointChange}
          layouts={this.state.layouts}
          onLayoutChange={(layout, layouts) => this.onLayoutChange(layout, layouts)}
          {...this.props}
        >
          {items.map((item, i) => this.createElement(item, i))}
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}

export default InsightGrid;
