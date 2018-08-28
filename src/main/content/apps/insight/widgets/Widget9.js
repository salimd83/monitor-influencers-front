import React, { Component } from "react";
import { Card, Divider, Icon, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles/index";
import classNames from "classnames";
import Popover from "@material-ui/core/Popover";

const styles = theme => ({
  root: {},
  typography: {
    margin: theme.spacing.unit,
    fontSize: "14px"
  }
});

class Widget9 extends Component {
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
    const { anchorEl } = this.state;
    const { data, popovertext, classes, title } = this.props;

    return (
      <Card className={classNames(classes.root, "w-full", "h-full")}>
        <div className="p-16 pr-4 flex flex-row items-center justify-between">
          <Typography className="h1 pr-16">
            <Icon className="tooltips" onClick={this.handleClick}>
              info
            </Icon>
            {title}
          </Typography>
        </div>

        <table className="simple">
          <thead>
            <tr>
              <th />
              <th className="text-right">Count</th>
            </tr>
          </thead>
          <tbody>
            {data.rows.length === 0 ? (
              <tr>
                <td>No Data To show</td>
              </tr>
            ) : (
              data.rows.map(row => (
                <tr key={row.name}>
                  <td>{row.link ? <a href={row.link}>{row.name}</a> : row.name}</td>
                  <td className="text-right">{row.count}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <Divider className="card-divider w-full" />
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

export default withStyles(styles, { withTheme: true })(Widget9);
