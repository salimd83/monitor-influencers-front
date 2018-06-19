import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FusePageSimple, FuseAnimate } from '@fuse';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as Actions from './store/actions';
import TypeaheadsList from './TypeaheadsList';
import TypeaheadsHeader from './TypeaheadsHeader';
import _ from 'lodash';
import { Button, Icon } from '@material-ui/core';
import TypeaheadDialog from './TypeaheadDialog';

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
  addButton: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    zIndex: 99,
    margin: 0,
    top: 'auto',
    right: 60,
    bottom: 40,
    left: 'auto',
    position: 'fixed'
  }
});

class TypeaheadApp extends Component {
  componentDidMount() {
    this.props.getTypeaheads(this.props.match.params);
  }

  componentDidUpdate(prevProps, prevState) {
    if (!_.isEqual(this.props.location, prevProps.location)) {
      this.props.getTypeaheads(this.props.match.params);
    }
  }

  render() {
    const { classes, openNewTypeaheadDialog } = this.props;

    return (
      <React.Fragment>
        <FusePageSimple
          className={classes.root}
          classes={{
            root: classes.layoutRoot,
            contentCardWrapper: classes.layoutContentCardWrapper
          }}
          header={<TypeaheadsHeader pageLayout={() => this.pageLayout} />}
          content={<TypeaheadsList />}
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
            onClick={openNewTypeaheadDialog}
          >
            <Icon>add</Icon>
          </Button>
        </FuseAnimate>
        <TypeaheadDialog />
      </React.Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getTypeaheads: Actions.getTypeaheads,
      openNewTypeaheadDialog: Actions.openNewTypeaheadDialog
    },
    dispatch
  );
}

function mapStateToProps({ typeaheadsApp }) {
  return {
    typeaheads: typeaheadsApp.typeaheads.entities,
    selectedTypeaheadsIds: typeaheadsApp.typeaheads.selectedTypeaheadsIds,
    searchText: typeaheadsApp.typeaheads.searchText,
    searchType: typeaheadsApp.typeaheads.searchType,
    user: typeaheadsApp.user
  };
}

export default withStyles(styles, { withTheme: true })(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(TypeaheadApp)
  )
);
