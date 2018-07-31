import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { FusePageCarded, FuseAnimate } from "@fuse";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as Actions from "./store/actions";
import TypeaheadsList from "./TypeaheadsList";
import TypeaheadsHeader from "./TypeaheadsHeader";
import _ from "lodash";
import { Button, Icon } from "@material-ui/core";
import TypeaheadDialog from "./TypeaheadDialog";

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
    position: "absolute",
    right: 12,
    bottom: 12,
    zIndex: 99
  }
});

class TypeaheadApp extends Component {
  componentDidMount() {
    const {getTypeaheads, match, getTypes, types, openLoadTypeaheadDialog} = this.props;
    getTypeaheads(match.params.type, match.params.term);
    if(match.params.id) openLoadTypeaheadDialog(match.params.id)
    if (types.length === 0) getTypes();
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(this.props.location, prevProps.location)) {
      this.props.getTypeaheads(this.props.match.params.type, this.props.match.params.term);
    }
  }

  render() {
    const { classes, openNewTypeaheadDialog, types } = this.props;

    return (
      <div id="typeaheadApp">
        <FusePageCarded
          className={classes.root}
          header={<TypeaheadsHeader types={types} pageLayout={() => this.pageLayout} />}
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
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getTypeaheads: Actions.getTypeaheads,
      openNewTypeaheadDialog: Actions.openNewTypeaheadDialog,
      getTypes: Actions.getTypes,
      openLoadTypeaheadDialog: Actions.openLoadTypeaheadDialog,
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
    user: typeaheadsApp.user,
    types: typeaheadsApp.typeaheads.types
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
