import React, { Component } from "react";
import { Icon, Card, Typography } from "@material-ui/core";
import { Line } from "react-chartjs-2";
import { withStyles } from "@material-ui/core/styles/index";
import classNames from "classnames";
import _ from "lodash";

const styles = theme => ({
  root: {},
  typography: {
    margin: theme.spacing.unit,
    fontSize: "14px"
  }
});

class EngagmentGraph extends Component {
  state = {
    dataset: "today",
  };

  setDataSet = dataset => {
    this.setState({ dataset });
  };

  render() {
    const { classes, data: dataRaw, theme } = this.props;
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
      <div className={classNames(classes.root, "w-full")} style={{width: '100%'}} >

        <Typography style={{width: '100%'}} className="relative pb-16" style={{ minHeight: "200px", marginTop: '20px' }}>
          <Line
            data={{
              labels: data.labels,
              datasets: dataWithColors
            }}
            options={data.options}
            style={{width: '100%'}}
          />
        </Typography>
      </div>
    );
  }
}

const lightenDarkenColor = (col, amt) => {
  let usePound = false;

  if (col[0] == "#") {
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

export default withStyles(styles, { withTheme: true })(EngagmentGraph);
