import React, { Component } from "react";
import { Icon, Card, Typography } from "@material-ui/core";
import { Bar } from "react-chartjs-2";
import { withStyles } from "@material-ui/core/styles/index";
import classNames from "classnames";
import _ from "lodash";
import Popover from "@material-ui/core/Popover";

const styles = theme => ({
  root: {},
  typography: {
    margin: theme.spacing.unit,
    fontSize: "14px"
  }
});

class Widget5 extends Component {
  state = {
    dataset: "today",
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
    const { classes, data: dataRaw, theme, popovertext, title } = this.props;
    const { dataset, anchorEl } = this.state;

    const data = _.merge({}, dataRaw);
    const dataWithColors = data.datasets[dataset].map((obj, index) => {
      const palette = theme.palette[index === 0 ? "primary" : "secondary"];
      const bgColor = obj.bgColor;
      const LineColor = obj.lineColor;
      return {
        ...obj,
        borderColor: LineColor,
        backgroundColor: bgColor,
        pointBackgroundColor: lightenDarkenColor(LineColor, -20),
        pointHoverBackgroundColor: lightenDarkenColor(LineColor, -60),
        pointBorderColor: palette.contrastText,
        pointHoverBorderColor: palette.contrastText
      };
    });
    return (
      <Card className={classNames(classes.root, "w-full", "h-full")}>
        <div className="relative p-24 flex flex-row items-center justify-between">
          <div className="flex flex-col">
            <Icon className="tooltips" onClick={this.handleClick}>
              info
            </Icon>
            <Typography className="h2">{title}</Typography>
          </div>
        </div>

        <Typography className="relative pb-16" style={{ minHeight: "347px" }}>
          <Bar
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
            vertical: "bottom",
            horizontal: "right"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
        >
          <Typography className={classes.typography}>{popovertext}</Typography>
        </Popover>
      </Card>
    );
  }
}

const lightenDarkenColor = (col, amt) => {
  let usePound = false;

  if (col[0] === "#") {
    col = col.slice(1);
    usePound = true;
  }
  let num = parseInt(col, 16);
  let r = (num >> 16) + amt;
  if (r > 255) r = 255;
  else if (r < 0) r = 0;
  let b = ((num >> 8) & 0x00ff) + amt;
  if (b > 255) b = 255;
  else if (b < 0) b = 0;
  let g = (num & 0x0000ff) + amt;
  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
};

export default withStyles(styles, { withTheme: true })(Widget5);
