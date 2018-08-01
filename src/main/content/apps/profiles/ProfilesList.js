import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { FuseUtils, FuseAnimate } from '@fuse';
import { Avatar, Icon, IconButton, Typography, CircularProgress } from '@material-ui/core';
import { bindActionCreators } from 'redux';
import * as Actions from './store/actions';
import ReactTable from 'react-table';
import classNames from 'classnames';
import DeleteDialog from './DeleteDialog';

const styles = theme => ({
  avatar: {
    backgroundColor: theme.palette.primary[500]
  }
});

class ProfilesList extends Component {
  state = {
    confirmDeleteOpen: false,
    selectedProfile: {}
  };

  confirmDelete = (profile) => {
    this.setState({ confirmDeleteOpen: true, selectedProfile: profile });
  };

  handleClose = () => {
    this.setState({ confirmDeleteOpen: false });
  };

  getFilteredArray = (entities, searchText) => {
    const arr = Object.keys(entities).map(id => entities[id]);
    if (searchText.length === 0) {
      return arr;
    }
    return FuseUtils.filterArrayByString(arr, searchText);
  };

  render() {
    const { classes, profiles, searchText, openEditProfileDialog, loadingProfiles, removeProfile } = this.props;
    const {selectedProfile, confirmDeleteOpen} = this.state;

    const data = this.getFilteredArray(profiles, searchText);

    if (loadingProfiles) {
      return (
        <div className="flex items-center justify-center h-full" style={{ margin: '20px' }}>
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
      <React.Fragment>
        <DeleteDialog
          open={confirmDeleteOpen}
          handleClickOpen={this.handleClickOpen}
          handleClose={this.handleClose}
          profile={selectedProfile}
          removeProfile={removeProfile}
        />
        <FuseAnimate animation="transition.slideUpIn" delay={300}>
          <ReactTable
            className={classNames(classes.root, '-striped -highlight')}
            getTrProps={() => {
              return {
                className: 'cursor-pointer'
              };
            }}
            data={Object.values(profiles)}
            columns={[
              {
                Header: '',
                accessor: 'profile_picture',
                Cell: row => (<Link to={`/mirrorr/admin/profile/${row.original.id}`}>
                    <Avatar className="mr-8" alt={row.original.name} src={row.value} />
                  </Link>
                ),
                className: 'justify-center',
                width: 80,
                sortable: false
              },
              {
                Header    : () => <div className="py-8">First Name</div>,
                accessor  : 'first_name',
                filterable: true,
                  Cell    : row => <Link to={`/mirrorr/admin/profile/${row.original.id}`}>{row.value}</Link>,
                className : 'font-bold'
              },
              {
                Header    : 'Last Name',
                accessor  : 'last_name',
                  Cell    : row => <Link to={`/mirrorr/admin//profile/${row.original.id}`}>{row.value}</Link>,
                filterable: true,
                className : 'font-bold'
              },
              {
                Header: 'Country',
                accessor: 'country.name',
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
                width: 64,
                Cell: row => (
                  <div className="flex items-center">
                    <IconButton
                      onClick={e => {
                        e.stopPropagation();
                        openEditProfileDialog(row.original.id);
                      }}
                    >
                      <Icon>edit</Icon>
                    </IconButton>
                  </div>
                )
              },
              {
                Header: '',
                width: 64,
                Cell: row => (
                  <div className="flex items-center">
                    <IconButton
                      onClick={e => {
                        e.stopPropagation();
                        this.confirmDelete(row.original)
                      }}
                    >
                      <Icon color="error">delete</Icon>
                    </IconButton>
                  </div>
                )
              }
            ]}
            defaultPageSize={10}
            noDataText="No profiles found"
          />
        </FuseAnimate>
      </React.Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getProfiles: Actions.getProfiles,
      getUserData: Actions.getUserData,
      openEditProfileDialog: Actions.openEditProfileDialog,
      removeProfile: Actions.removeProfile
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
    user: profilesApp.user
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
