import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FusePageCarded, FuseAnimate } from '@fuse';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as Actions from './store/actions';
import ProfilesList from 'main/content/apps/profiles/ProfilesList';
import ProfilesHeader from 'main/content/apps/profiles/ProfilesHeader';
import _ from 'lodash';
import { Button, Icon } from '@material-ui/core';
import ProfileDialog from 'main/content/apps/profiles/ProfileDialog';
import * as Fn from 'fn/simpleCall.js';

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
  addButton: {
    zIndex: 99,
    margin: 0,
    top: 'auto',
    right: 60,
    bottom: 40,
    left: 'auto',
    position: 'fixed'
  }
});

class ProfilesApp extends Component {
  state = {
    industries: [],
    countries: [],
    categories: [],
    genders: [],
    languages: []
  };

  componentDidMount() {
    this.props.getProfiles(this.props.match.params.term || '');
    this.props.getUserData();

    Fn.simpleCall('get', 'typeahead/industry').then(res => {
      this.setState({
        industries: res.data
      });
    });

    Fn.simpleCall('get', 'typeahead/country').then(res => {
      this.setState({
        countries: res.data
      });
    });

    Fn.simpleCall('get', 'typeahead/category').then(res => {
      this.setState({
        categories: res.data
      });
    });
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(this.props.location, prevProps.location)) {
      this.props.getProfiles(this.props.match.params.term || '');
    }
  }

  render() {
    const { classes, openNewProfileDialog } = this.props;

    return (
      <div id="profileApp">
        <FusePageCarded
          className={classes.root}
          classes={{
            root: classes.layoutRoot,
            contentCardWrapper: classes.layoutContentCardWrapper,
            leftSidebar: classes.layoutLeftSidebar
          }}
          header={<ProfilesHeader pageLayout={() => this.pageLayout} />}
          content={<ProfilesList />}
          sidebarInner
          onRef={instance => {
            this.pageLayout = instance;
          }}
        />
        <FuseAnimate animation="transition.expandIn" delay={300}>
          <Button
            variant="fab"
            color="primary"
            aria-label="add"
            className={classes.addButton}
            onClick={openNewProfileDialog}
          >
            <Icon>person_add</Icon>
          </Button>
        </FuseAnimate>
        <ProfileDialog {...this.state} />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getProfiles: Actions.getProfiles,
      getUserData: Actions.getUserData,
      openNewProfileDialog: Actions.openNewProfileDialog
    },
    dispatch
  );
}

function mapStateToProps({ profilesApp }) {
  return {
    profiles: profilesApp.profiles.entities,
    selectedProfileIds: profilesApp.profiles.selectedProfileIds,
    searchText: profilesApp.profiles.searchText,
    user: profilesApp.user
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
