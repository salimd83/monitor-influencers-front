import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { FuseUtils, FuseAnimate } from "@fuse";
import { CSVLink } from "react-csv";
import * as Fn from "fn/simpleCall.js";
import {
  Avatar,
  Checkbox,
  Icon,
  IconButton,
  Typography,
  CircularProgress,
  Button,
  Menu,
  MenuItem,
  Badge,
  LinearProgress
} from "@material-ui/core";
import { bindActionCreators } from "redux";
import * as Actions from "./store/actions";
import { showMessage } from "../../../../store/actions/fuse";
import ReactTable from "react-table";
import classNames from "classnames";
import DeleteDialog from "./DeleteDialog";

const ITEM_HEIGHT = 48;

const styles = theme => ({
  avatar: {
    backgroundColor: theme.palette.primary[500]
  },
  badge: {
    margin: 3,
    fontSize: 10
  }
});

class ProfilesList extends Component {
  state = {
    confirmDeleteOpen: false,
    selectedProfile: [],
    anchorEl: null,
    CSVData: [],
    completed: -1
  };

  handleMenuClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  confirmDelete = profile => {
    this.setState({ confirmDeleteOpen: true, selectedProfile: profile });
  };

  handleClose = () => {
    this.setState({ confirmDeleteOpen: false });
  };

  compareProfiles = () => {
    if (this.props.selectedProfileIds.length < 2) {
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

  exportExcel = async () => {
    if (this.props.selectedProfileIds.length < 1) {
      this.props.showMessage({
        message: "Please select at least 1 profile to export",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "left"
        }
      });
      return;
    }
    const { selectedProfileIds } = this.props;
    const data = await Promise.all(
      selectedProfileIds.map(async id => {
        const res = await Fn.simpleCall("get", `si/profiles/${id}`);
        res.data.tags = res.data.tags.map(tag => tag.name).join(',')
        res.data.links = res.data.links.map(link => link.type + '@' + link.value).join(', ')
        res.data.country = res.data.country.name
        res.data.category = res.data.category.name
        res.data.industry = res.data.industry.name
        res.data.location = res.data.location.name
        delete res.data.id
        this.setState(prevState => ({
          completed: prevState.completed + 100 / selectedProfileIds.length
        }));
        return Promise.resolve(res.data);
      })
    );
    this.setState({
      CSVData: data
    });
  };

  getFilteredArray = (entities, searchText) => {
    const arr = Object.keys(entities).map(id => entities[id]);
    if (searchText.length === 0) {
      return arr;
    }
    return FuseUtils.filterArrayByString(arr, searchText);
  };

  render() {
    const {
      classes,
      profiles,
      searchText,
      openEditProfileDialog,
      loadingProfiles,
      removeProfile,
      selectedProfileIds,
      selectAllProfiles,
      deSelectAllProfiles,
      toggleInSelectedProfiles
    } = this.props;
    const {
      selectedProfile,
      confirmDeleteOpen,
      anchorEl,
      CSVData,
      completed
    } = this.state;
    const open = Boolean(anchorEl);

    const data = this.getFilteredArray(profiles, searchText);

    const renderDownloadExcel = () => {
      if (completed === -1)
        return <div onClick={this.exportExcel}>Export Excel</div>;
      else if (completed >= 99)
        return (
          <CSVLink
            data={CSVData}
            onClick={() => this.setState({ completed: -1 })}
          >
            Download file
          </CSVLink>
        );
      else
        return (
          <div style={{ width: "100%" }}>
            <LinearProgress variant="determinate" value={completed} />
          </div>
        );
    };

    if (loadingProfiles) {
      return (
        <div
          className="flex items-center justify-center h-full"
          style={{ margin: "20px" }}
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
            className={classNames(classes.root, "-striped -highlight")}
            getTrProps={() => {
              return {
                className: "cursor-pointer"
              };
            }}
            data={Object.values(profiles)}
            columns={[
              {
                Header: () => (
                  <Checkbox
                    onClick={event => {
                      event.stopPropagation();
                    }}
                    onChange={event => {
                      event.target.checked
                        ? selectAllProfiles()
                        : deSelectAllProfiles();
                    }}
                    checked={
                      selectedProfileIds.length ===
                        Object.keys(profiles).length &&
                      selectedProfileIds.length > 0
                    }
                    indeterminate={
                      selectedProfileIds.length !==
                        Object.keys(profiles).length &&
                      selectedProfileIds.length > 0
                    }
                  />
                ),
                accessor: "",
                Cell: row => {
                  return (
                    <Checkbox
                      onClick={event => {
                        event.stopPropagation();
                      }}
                      checked={selectedProfileIds.includes(row.value.id)}
                      onChange={() => toggleInSelectedProfiles(row.value.id)}
                    />
                  );
                },
                className: "justify-center",
                sortable: false,
                width: 64
              },
              {
                Header: "",
                accessor: "profile_picture",
                Cell: row => (
                  <Link to={`/admin/profile/${row.original.id}`}>
                    <Avatar
                      className="mr-8"
                      alt={row.original.name}
                      src={row.value}
                    />
                  </Link>
                ),
                className: "justify-center",
                width: 80,
                sortable: false
              },
              {
                Header: () => <div className="py-8">First Name</div>,
                accessor: "first_name",
                filterable: true,
                Cell: row => (
                  <Link to={`/admin/profile/${row.original.id}`}>
                    {row.value}
                  </Link>
                ),
                className: "font-bold"
              },
              {
                Header: "Last Name",
                accessor: "last_name",
                Cell: row => (
                  <Link to={`/admin//profile/${row.original.id}`}>
                    {row.value}
                  </Link>
                ),
                filterable: true,
                className: "font-bold"
              },
              {
                Header: "Country",
                accessor: "country.name",
                filterable: true
              },
              {
                Header: "Industry",
                accessor: "industry.name",
                filterable: true
              },
              {
                Header: "Category",
                accessor: "category.name",
                filterable: true
              },
              {
                Header: "",
                width: 64,
                sortable: false,
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
                Header: () => (
                  <div>
                    <Button
                      aria-label="add"
                      aria-owns={open ? "long-menu" : null}
                      aria-haspopup="true"
                      onClick={this.handleMenuClick}
                    >
                      {selectedProfileIds.length ? (
                        <FuseAnimate
                          animation="transition.expandIn"
                          duration={200}
                        >
                          <Badge
                            badgeContent={selectedProfileIds.length}
                            color="secondary"
                          >
                            <Icon>more_vert</Icon>
                          </Badge>
                        </FuseAnimate>
                      ) : (
                        <Icon>more_vert</Icon>
                      )}
                    </Button>

                    <Menu
                      id="long-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={this.handleMenuClose}
                      PaperProps={{
                        style: {
                          maxHeight: ITEM_HEIGHT * 4.5,
                          width: 200
                        }
                      }}
                    >
                      <MenuItem onClick={this.compareProfiles}>
                        Compare
                      </MenuItem>
                      <MenuItem>{renderDownloadExcel()}</MenuItem>
                    </Menu>
                  </div>
                ),
                width: 64,
                sortable: false,
                Cell: row => (
                  <div className="flex items-center">
                    <IconButton
                      onClick={e => {
                        e.stopPropagation();
                        this.confirmDelete(row.original);
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
      openEditProfileDialog: Actions.openEditProfileDialog,
      removeProfile: Actions.removeProfile,
      toggleInSelectedProfiles: Actions.toggleInSelectedProfiles,
      selectAllProfiles: Actions.selectAllProfiles,
      deSelectAllProfiles: Actions.deSelectAllProfiles,
      showMessage
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
    selectedProfileIds: profilesApp.profiles.selectedProfileIds
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
