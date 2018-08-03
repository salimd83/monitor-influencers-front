import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { FuseUtils, FuseAnimate } from "@fuse";
import { Typography, IconButton, Icon } from "@material-ui/core";
import { bindActionCreators } from "redux";
import * as Actions from "./store/actions";
import ReactTable from "react-table";
import classNames from "classnames";
import DeleteDialog from "./DeleteDialog";

const styles = theme => ({
  labels: {}
});

class TypeaheadsList extends Component {
  state = {
    data: [],
    pages: null,
    loading: true,
    confirmDeleteOpen: false,
    selectedTypeahead: {}
  };

  confirmDelete = type => {
    this.setState({ confirmDeleteOpen: true, selectedTypeahead: type });
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
    const {
      classes,
      typeaheads,
      openEditTypeaheadDialog,
      searchType,
      history,
      searchText,
      deleteTypeahead
    } = this.props;
    const { confirmDeleteOpen, selectedTypeahead } = this.state;
    const data = this.getFilteredArray(typeaheads, "");

    return (
      <React.Fragment>
        <DeleteDialog
          open={confirmDeleteOpen}
          handleClickOpen={this.handleClickOpen}
          handleClose={this.handleClose}
          typeahead={selectedTypeahead}
          deleteTypeahead={deleteTypeahead}
        />
        <FuseAnimate animation="transition.slideUpIn" delay={300}>
          <ReactTable
            className={classNames(classes.root, "-striped -highlight")}
            getTrProps={(state, rowInfo, column) => {
              return {
                className: "cursor-pointer",
                onClick: () => {
                  if (rowInfo) {
                    openEditTypeaheadDialog(rowInfo.original);
                    history.push(
                      `/admin/typeahead/${searchType}/${searchText || "*"}/${rowInfo.original.id}`
                    );
                  }
                }
              };
            }}
            data={data}
            columns={[
              {
                Header: <Typography className="pt-8 pb-8">Name</Typography>,
                accessor: "name",
                filterable: false,
                sortable: false,
                className: "font-bold ml-16"
              },
              {
                Header: "Type",
                accessor: "type",
                filterable: false,
                sortable: false,
                className: "font-bold ml-16"
              },
              {
                Header: "Status",
                accessor: "status",
                filterable: false,
                sortable: false,
                className: "font-bold ml-16"
              },
              {
                Header: "Public Description",
                accessor: "description",
                filterable: false
              },
              {
                Header: "Internal Note",
                accessor: "note",
                filterable: false,
                sortable: false,
                className: "font-bold ml-16"
              },
              {
                Header: "Related Link",
                accessor: "related_link",
                filterable: false,
                sortable: false,
                className: "font-bold ml-16"
              },
              {
                Header: "",
                width: 64,
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
            //	manual
            //	onFetchData={this.fetchData} // Request new data when things change
            defaultPageSize={20}
            noDataText="No typeahead found."
          />
        </FuseAnimate>
      </React.Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getTypeaheads: Actions.getTypeaheads,
      openEditTypeaheadDialog: Actions.openEditTypeaheadDialog,
      deleteTypeahead: Actions.deleteTypeahead
    },
    dispatch
  );
}

function mapStateToProps({ typeaheadsApp }) {
  return {
    typeaheads: typeaheadsApp.typeaheads.entities,
    searchText: typeaheadsApp.typeaheads.searchText,
    searchType: typeaheadsApp.typeaheads.searchType
  };
}

export default withStyles(styles, { withTheme: true })(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(TypeaheadsList)
  )
);
