import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FuseUtils, FuseAnimate } from '@fuse';
import { Typography } from '@material-ui/core';
import { bindActionCreators } from 'redux';
import * as Actions from './store/actions';
import ReactTable from 'react-table';
import classNames from 'classnames';

const styles = theme => ({
  labels: {}
});

class TypeaheadsList extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      pages: null,
      loading: true
    };
  }

  getFilteredArray = (entities, searchText) => {
    const arr = Object.keys(entities).map(id => entities[id]);
    if (searchText.length === 0) {
      return arr;
    }
    return FuseUtils.filterArrayByString(arr, searchText);
  };

  render() {
    const { classes, typeaheads, openEditTypeaheadDialog } = this.props;
    const data = this.getFilteredArray(typeaheads, '');

    return (
      <FuseAnimate animation="transition.slideUpIn" delay={300}>
        <ReactTable
          className={classNames(classes.root, '-striped -highlight')}
          getTrProps={(state, rowInfo, column) => {
            return {
              className: 'cursor-pointer',
              onClick: () => {
                if (rowInfo) {
                  openEditTypeaheadDialog(rowInfo.original);
                }
              }
            };
          }}
          data={data}
          columns={[
            {
              Header: <Typography className="pt-8 pb-8">Name</Typography>,
              accessor: 'name',
              filterable: false,
              sortable: false,
              className: 'font-bold ml-16'
            },
            {
              Header: 'Type',
              accessor: 'type',
              filterable: false,
              sortable: false,
              className: 'font-bold ml-16'
            },
            {
              Header: 'Status',
              accessor: 'status',
              filterable: false,
              sortable: false,
              className: 'font-bold ml-16'
            },
            {
              Header: 'Public Description',
              accessor: 'description',
              filterable: false,
              sortable: false
            },
            {
              Header: 'Internal Note',
              accessor: 'note',
              filterable: false,
              sortable: false,
              className: 'font-bold ml-16'
            },
            {
              Header: 'Related Link',
              accessor: 'related_link',
              filterable: false,
              sortable: false,
              className: 'font-bold ml-16'
            }
          ]}
          //	manual
          //	onFetchData={this.fetchData} // Request new data when things change
          defaultPageSize={20}
          noDataText="No typeahead found."
        />
      </FuseAnimate>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getTypeaheads: Actions.getTypeaheads,
      toggleInSelectedTypeaheads: Actions.toggleInSelectedTypeaheads,
      selectAllTypeaheads: Actions.selectAllTypeaheads,
      deSelectAllTypeaheads: Actions.deSelectAllTypeaheads,
      openEditTypeaheadDialog: Actions.openEditTypeaheadDialog,
      removeTypeaheads: Actions.removeTypeaheads,
      removeTypeahead: Actions.removeTypeahead,
      toggleStarredTypeahead: Actions.toggleStarredTypeahead,
      toggleStarredTypeaheads: Actions.toggleStarredTypeaheads,
      setTypeaheadsStarred: Actions.setTypeaheadsStarred,
      setTypeaheadsUnstarred: Actions.setTypeaheadsUnstarred
    },
    dispatch
  );
}

function mapStateToProps({ typeaheadsApp }) {
  return {
    typeaheads: typeaheadsApp.typeaheads.entities,
    selectedTypeaheadIds: typeaheadsApp.typeaheads.selectedTypeaheadIds,
    searchText: typeaheadsApp.typeaheads.searchText
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
