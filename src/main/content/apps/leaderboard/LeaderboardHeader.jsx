import React, { Component } from "react";
import {
  Icon,
  Typography,
  Grid,
  Button,
  SwipeableDrawer,
  withStyles,
  List,
  ListItem,
  Divider
} from "@material-ui/core";
import classNames from "classnames";
import { FuseAnimate } from "@fuse";

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.primary.dark
  },
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  button: {
    margin: theme.spacing.unit,
    minWidth: 40
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 18
  }
});

class LeaderboardHeader extends Component {
  state = {
    drawer: false
  };

  toggleDrawer = () => {
    this.setState(prevState => ({
      drawer: !prevState.drawer
    }));
  };

  render() {
    const {
      classes,
      industriesFilter,
      termFilter,
      selectedProfiles,
      genderFilter,
      languageFilter,
      tagsFilter,
      selectAllProfiles,
      deSelectAllProfiles
    } = this.props;

    const someCheckProfile = selectedProfiles.length > 0;

    const sideList = (
      <div className={classes.list}>
        <List>
          <ListItem>{termFilter}</ListItem>
        </List>
        <Divider />
        <List>
          <ListItem>{industriesFilter}</ListItem>
          <ListItem>{genderFilter}</ListItem>
          <ListItem>{languageFilter}</ListItem>
          <ListItem id="tagsFilter">{tagsFilter}</ListItem>
        </List>
      </div>
    );

    return (
      <div id="leaderboard-header">
        <Grid
          container
          spacing={16}
          alignItems="center"
          direction="row"
          justify="space-between"
          className="cardedPageHeader"
        >
          <Grid item>
            <div className="flex items-center">
              <FuseAnimate animation="transition.expandIn" delay={300}>
                <Icon className="text-32 mr-12">account_box</Icon>
              </FuseAnimate>
              <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                <Typography variant="title">Social Leaderboard</Typography>
              </FuseAnimate>
            </div>
          </Grid>
          <Grid item>
            {someCheckProfile && (
              <FuseAnimate animation="transition.expandIn" delay={300}>
                <Button
                  variant="contained"
                  size="small"
                  color="secondary"
                  className={classes.button}
                  onClick={this.toggleDrawer}
                >
                  Export
                </Button>
              </FuseAnimate>
            )}

            <Button
              variant={someCheckProfile ? 'outlined' : 'contained'}
              size="small"
              color="secondary"
              className={classes.button}
              onClick={someCheckProfile ? deSelectAllProfiles : selectAllProfiles}
            >
              { someCheckProfile ? 'Clear Selection' : 'Select All' }
            </Button>

            <Button
              variant="contained"
              size="small"
              color="secondary"
              className={classes.button}
              onClick={this.toggleDrawer}
            >
              <Icon className={classNames(classes.iconSmall)}>search</Icon>
            </Button>

            <SwipeableDrawer
              anchor="right"
              open={this.state.drawer}
              onClose={this.toggleDrawer}
              onOpen={this.toggleDrawer}
              PaperProps={{ classes: { root: classes.root } }}
            >
              <div tabIndex={0}>{sideList}</div>
            </SwipeableDrawer>

            {/* <div className="flex items-center">
              <Grid container spacing={16} alignItems="center" direction="row">
                <Grid item style={{ zIndex: 1000 }}>
                  <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                    {industriesFilter}
                  </FuseAnimate>
                </Grid>
                <Grid item>
                  <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                    {termFilter}
                  </FuseAnimate>
                </Grid>
              </Grid>
            </div> */}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(LeaderboardHeader);
