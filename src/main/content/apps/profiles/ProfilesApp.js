import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { FusePageCarded, FuseAnimateGroup } from "@fuse";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as Actions from "./store/actions";
import ProfilesList from "main/content/apps/profiles/ProfilesList";
import ProfilesHeader from "main/content/apps/profiles/ProfilesHeader";
import _ from "lodash";
import { Button, Icon, GridList, GridListTile, GridListTileBar, IconButton } from "@material-ui/core";
import ProfileDialog from "main/content/apps/profiles/ProfileDialog";
import ImportExcelDialog from "main/content/apps/profiles/ImportExcelDialog";
import * as Fn from "fn/simpleCall.js";

const headerHeight = 160;

const styles = theme => ({
  root: {},
  avatar: {},
  layoutHeader: {
    height: headerHeight,
    minHeight: headerHeight
  },
  layoutContentCardWrapper: {
    padding: 24,
    paddingBottom: 80
  },
  layoutLeftSidebar: {
    width: 246
  },
  // addButton: {
  //   zIndex: 99,
  //   margin: 0,
  //   top: "auto",
  //   right: 60,
  //   bottom: 40,
  //   left: "auto",
  //   position: "fixed"
  // },
  compareButton: {
    zIndex: 99,
    margin: 0,
    top: "auto",
    right: 130,
    bottom: 20,
    left: "auto",
    position: "fixed",
    backgroundColor: theme.palette.primary.light,
    color: "#fff"
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
    position: "fixed",
    bottom: 0,
    left: "25vw",
    width: "50vw",
    background: theme.palette.primary.light,
    zIndex: 90
  },
  gridListTile: {
    height: 122
  },
  title: {
    color: theme.palette.primary.light
  },
  titleBar: {
    background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
  }
});

class ProfilesApp extends Component {
  state = {
    industries: [],
    countries: [],
    categories: [],
    genders: [],
    languages: [],
    importDialogOpen: false,
  };

  componentDidMount() {
    this.props.getProfiles(this.props.match.params.term || "");

    Fn.simpleCall("get", "typeahead/industry").then(res => {
      this.setState({
        industries: res.data
      });
    });

    Fn.simpleCall("get", "typeahead/country").then(res => {
      this.setState({
        countries: res.data
      });
    });

    Fn.simpleCall("get", "typeahead/category").then(res => {
      this.setState({
        categories: res.data
      });
    });
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(this.props.location, prevProps.location)) {
      this.props.getProfiles(this.props.match.params.term || "");
    }
  }

  onOpenDialogImport = () => {
    this.setState({
      importDialogOpen: true
    });
  };

  onClose = () => {
    this.setState({ importDialogOpen: false });
  };

  compareProfiles = () => {
    if (this.props.selectedProfiles.length < 2) {
      this.props.showMessage({
        message: "Please select at least 2 profile to compare",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "left"
        }
      });
      return;
    }
    this.props.history.push("/reports");
  };

  onCompareProfileClose = profile => () => {
    this.props.toggleInSelectedProfiles(profile)
  }

  render() {
    const { classes, selectedProfiles } = this.props;
    const { importDialogOpen, ...stateProps } = this.state;

    return (
      <div id="profileApp">
        <FusePageCarded
          header={<ProfilesHeader pageLayout={() => this.pageLayout} />}
          content={
            <ProfilesList
              onOpenDialogImport={this.onOpenDialogImport}
            />
          }
          sidebarInner
          innerScroll={true}
          onRef={instance => {
            this.pageLayout = instance;
          }}
        />
        <FuseAnimateGroup
          enter={{
            animation: "transition.slideUpBigIn"
          }}
          leave={{
            animation: "transition.slideDownBigOut"
          }}
        >
          {/* <Button
            variant="fab"
            color="primary"
            aria-label="add"
            className={classes.addButton}
            onClick={openNewProfileDialog}
          >
            <Icon>person_add</Icon>
          </Button> */}

          {/* <Button
            variant="fab"
            color="secondary"
            aria-label="add"
            className={classes.compareButton}
            onClick={this.onOpenDialogImport}
          >
            <Icon>cloud_upload</Icon>
          </Button> */}
          {selectedProfiles.length > 0 && (
            <Button variant="fab" aria-label="add" className={classes.compareButton} onClick={this.compareProfiles}>
              <Icon>compare_arrows</Icon>
            </Button>
          )}
        </FuseAnimateGroup>
        <ProfileDialog {...stateProps} />
        <ImportExcelDialog open={importDialogOpen} close={this.onClose} />
        <FuseAnimateGroup
          enter={{
            animation: "transition.slideUpBigIn"
          }}
          leave={{
            animation: "transition.slideDownBigOut"
          }}
        >
          {selectedProfiles.length > 0 && (
            <GridList cols={10} className={`${classes.gridList} compare-bar`}>
              {selectedProfiles.map(profile => (
                <GridListTile key={profile.profile_picture} className={classes.gridListTile}>
                  <img src={profile.profile_picture} alt={`${profile.first_name} ${profile.last_name}`} />
                  <GridListTileBar
                    title={`${profile.first_name} ${profile.last_name}`}
                    classes={{
                      root: classes.titleBar,
                      title: classes.title
                    }}
                    actionIcon={
                      <IconButton onClick={this.onCompareProfileClose(profile)}>
                        <Icon color="error">cancel</Icon>
                      </IconButton>
                    }
                  />
                </GridListTile>
              ))}
            </GridList>
          )}
        </FuseAnimateGroup>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getProfiles: Actions.getProfiles,
      toggleInSelectedProfiles: Actions.toggleInSelectedProfiles
    },
    dispatch
  );
}

function mapStateToProps({ profilesApp }) {
  return {
    profiles: profilesApp.profiles.entities,
    searchText: profilesApp.profiles.searchText,
    selectedProfiles: profilesApp.profiles.selectedProfiles,
  };
}

export default withStyles(styles, { withTheme: true })(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(ProfilesApp)
  )
);
