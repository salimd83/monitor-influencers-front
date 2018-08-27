import React, { Component } from "react";
import { Typography, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";

import { simpleStore } from "../../../../fn/simpleStore";
import initLayout from "./initLayout";

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const cards = initLayout;
let originalLayouts;
let breakpoint;

class InsightGrid extends Component {
  createElement = (item, index) => {
    const i = item.i;
    const Card = item.component;

    return (
      <div key={i} data-grid={item}>
        <Card size={this.state.layout && this.state.layout[index] ? this.state.layout[index].w : 2} />
        <span className="remove" onClick={this.onRemoveItem(i)}>
          x
        </span>
      </div>
    );
  };
  onAddItem = e => {
    /*eslint no-console: 0*/
    const id = e.target.value;
    const card = cards.filter(card => card.id === id)[0];

    const newItem = {
      i: card.i,
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
      items: [...this.state.items, newItem]
    });
  };
  onBreakpointChange = (breakpoint, cols) => {
    this.setState({
      breakpoint,
      cols
    });
  };
  onLayoutChange = (layout, layouts) => {
    // this.props.onLayoutChange(layout);
    simpleStore.upsert("siInsightsGrid2", layouts, "simple");
    this.setState({ layouts, layout });
    // this.props.onLayoutChange(layout); // updates status display
  };

  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      items: [],
      layouts: [],
      layout: [],
      breakpoint: "",
      cols: 0
    };
  }

  static get defaultProps() {
    return {
      className: "layout",
      cols: {
        lg: 16,
        md: 12,
        sm: 9,
        xs: 6,
        xxs: 3
      },
      rowHeight: 100
    };
  }

  componentDidMount() {
    originalLayouts = simpleStore.lookup("siInsightsGrid2", "simple") || {};

    const width = this.myRef.current.offsetWidth - 17;
    if (width >= 1200) {
      breakpoint = "lg";
    } else if (width >= 996) {
      breakpoint = "md";
    } else if (width >= 768) {
      breakpoint = "sm";
    } else if (width >= 480) {
      breakpoint = "xs";
    } else {
      breakpoint = "xxs";
    }

    console.log("originalLayouts[breakpoint]", originalLayouts[breakpoint]);
    let initialItems;
    if (typeof originalLayouts[breakpoint] === undefined) {
      initialItems = originalLayouts[breakpoint].map(item => cards.find(card => card.i === item.i));
    } else {
      initialItems = [0, 1, 2, 3, 4, 5].map(i => {
        return cards[i];
      });
    }

    console.log("initialItems", initialItems);

    this.setState({
      items: initialItems,
      layouts: originalLayouts,
      layout: originalLayouts[breakpoint]
    });
  }

  componentWillUnmount() {
    // simpleStore.upsert("siInsightsGrid2", this.state.layouts, "simple");
  }

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
    const hiddenItems = items && items.length > 0 && cards.filter(card => !items.some(item => item.i === card.i));

    return (
      <div ref={this.myRef} style={{ width: "100%" }}>
        {items && items.length > 0 && hiddenItems.length > 0 ? (
          <FormControl className="my-16 mx-16">
            <InputLabel>Charts:</InputLabel>
            <Select value="" onChange={this.onAddItem} style={{ width: "200px" }}>
              {hiddenItems.map(item => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          <Typography className="my-16 mx-16" varient="body2">
            No chart available
          </Typography>
        )}

        {items &&
          items.length > 0 && (
            <ResponsiveReactGridLayout
              onBreakpointChange={this.onBreakpointChange}
              layouts={this.state.layouts}
              onLayoutChange={(layout, layouts) => this.onLayoutChange(layout, layouts)}
              {...this.props}
            >
              {items.map((item, i) => this.createElement(item, i))}
            </ResponsiveReactGridLayout>
          )}
      </div>
    );
  }
}

export default InsightGrid;
