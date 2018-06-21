import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { FuseUtils, FuseAnimate } from '@fuse';
import {
  Avatar,
  Checkbox,
  Icon,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Typography,
  CircularProgress
} from '@material-ui/core';
import { bindActionCreators } from 'redux';
import * as Actions from './store/actions';
import ReactTable from 'react-table';
import classNames from 'classnames';

const styles = theme => ({
  mailList: {
    padding: 0
  },
  mailItem: {},
  avatar: {
    backgroundColor: theme.palette.primary[500]
  },
  labels: {}
});

class ProfilesList extends Component {
  state = {
    selectedProfilesMenu: null
  };

  getFilteredArray = (entities, searchText) => {
    const arr = Object.keys(entities).map(id => entities[id]);
    if (searchText.length === 0) {
      return arr;
    }
    return FuseUtils.filterArrayByString(arr, searchText);
  };

  openSelectedProfileMenu = event => {
    this.setState({ selectedProfilesMenu: event.currentTarget });
  };

  closeSelectedProfilesMenu = () => {
    this.setState({ selectedProfilesMenu: null });
  };

  render() {
    console.log('profiles', profiles);
    const {
      classes,
      profiles,
      user,
      searchText,
      selectedProfileIds,
      selectAllProfiles,
      deSelectAllProfiles,
      toggleInSelectedProfiles,
      openEditProfileDialog,
      removeProfiles,
      removeProfile,
      toggleStarredProfile,
      setProfilesUnstarred,
      setProfilesStarred,
      loadingProfiles,
      pages
    } = this.props;
    const data = this.getFilteredArray(profiles, searchText);
    const { selectedProfilesMenu } = this.state;

    if (loadingProfiles) {
      return (
        <div
          className="flex items-center justify-center h-full"
          style={{ margin: '20px' }}
        >
          <CircularProgress className={classes.progress} />
        </div>
      );
    } else if (!data && data.length === 0) {
      return (
        <div className="flex items-center justify-center h-full">
          <Typography color="textSecondary" variant="headline">
            There are no profiles!
          </Typography>
        </div>
      );
    }

    return (
      <FuseAnimate animation="transition.slideUpIn" delay={300}>
        <ReactTable
          className={classNames(classes.root, '-striped -highlight')}
          getTrProps={(state, rowInfo, column) => {
            return {
              className: 'cursor-pointer'
            };
          }}
          data={data}
          columns={[
            {
              Header: '',
              accessor: 'profile_picture',
              Cell: row => (
                <Link to={`/apps/profile/${row.original.id}`}>
                  <Avatar
                    className="mr-8"
                    alt={row.original.name}
                    src={row.value}
                  />
                </Link>
              ),
              className: 'justify-center',
              width: 96,
              sortable: false
            },
            {
              Header: () => <div className="my-12">First Name</div>,
              accessor: 'first_name',
              filterable: true,
              Cell: row => (
                <Link to={`/apps/profile/${row.original.id}`}>{row.value}</Link>
              ),
              className: 'font-bold'
            },
            {
              Header: 'Last Name',
              accessor: 'last_name',
              Cell: row => (
                <Link to={`/apps/profile/${row.original.id}`}>{row.value}</Link>
              ),
              filterable: true,
              className: 'font-bold'
            },
            {
              Header: 'Country',
              accessor: 'country',
              filterable: true
            },
            {
              Header: 'Industry',
              accessor: 'industry.name',
              filterable: true
            },
            {
              Header: 'Category',
              accessor: 'category.name',
              filterable: true
            },
            {
              Header: '',
              width: 128,
              Cell: row => (
                <div className="flex items-center">
                  <IconButton
                    onClick={ev => {
                      ev.stopPropagation();
                      toggleStarredProfile(row.original.id);
                    }}
                  >
                    {user.starred && user.starred.includes(row.original.id) ? (
                      <Icon>star</Icon>
                    ) : (
                      <Icon>star_border</Icon>
                    )}
                  </IconButton>
                  <IconButton
                    onClick={ev => {
                      ev.stopPropagation();
                      removeProfile(row.original.id);
                    }}
                  >
                    <Icon>delete</Icon>
                  </IconButton>
                </div>
              )
            }
          ]}
          defaultPageSize={10}
          noDataText="No profiles found"
        />
      </FuseAnimate>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getProfiles: Actions.getProfiles,
      getUserData: Actions.getUserData,
      toggleInSelectedProfiles: Actions.toggleInSelectedProfiles,
      selectAllProfiles: Actions.selectAllProfiles,
      deSelectAllProfiles: Actions.deSelectAllProfiles,
      openEditProfileDialog: Actions.openEditProfileDialog,
      removeProfiles: Actions.removeProfiles,
      removeProfile: Actions.removeProfile,
      toggleStarredProfile: Actions.toggleStarredProfile,
      toggleStarredProfiles: Actions.toggleStarredProfiles,
      setProfilesStarred: Actions.setProfilesStarred,
      setProfilesUnstarred: Actions.setProfilesUnstarred
    },
    dispatch
  );
}

function mapStateToProps({ profilesApp }) {
  const { profiles } = profilesApp;
  return {
    profiles: profiles.entities,
    selectedProfileIds: profiles.selectedProfileIds,
    loadingProfiles: profiles.loadingProfiles,
    searchText: profiles.searchText,
    user: profilesApp.user,
    pages: profilesApp.pages
  };
}

export default withStyles(styles, { withTheme: true })(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(ProfilesList)
  )
);
