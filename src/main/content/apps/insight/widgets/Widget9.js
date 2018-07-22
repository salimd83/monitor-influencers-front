import React, { Component } from "react";
import { Button, Card, Divider, Icon, IconButton, Typography } from "@material-ui/core";
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
    const { data, popovertext, classes, title, name } = this.props;

    return (
      <Card className={classNames(classes.root, "w-full", "h-full")}>
        <div className="p-16 pr-4 flex flex-row items-center justify-between">
          <Typography className="h1 pr-16">
            <Icon className="tooltips" onClick={this.handleClick}>
              info
            </Icon>
            {title}
          </Typography>

          {/* <div>
            <IconButton aria-label="more">
              <Icon>more_vert</Icon>
            </IconButton>
          </div> */}
        </div>

        <table className="simple clickable">
          <thead>
            <tr>
              <th />
              <th className="text-right">Count</th>
              {/* <th className="text-right">Conv</th> */}
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
                  {/* <td className="text-right">{row.conversion}</td> */}
                </tr>
              ))
            )}
          </tbody>
        </table>

        <Divider className="card-divider w-full" />

        {/* <div className="p-8 pt-16 flex flex-row items-center">
          <Button>GO TO {name.toUpperCase()}</Button>
        </div> */}
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
