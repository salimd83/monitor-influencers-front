import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles/index';
import { Icon, TextField, Typography, Grid } from '@material-ui/core';
import * as Actions from './store/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { FuseAnimate } from '@fuse';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import { set, debounce } from 'lodash';

const styles = theme => ({
  root: {}
});

class TypeaheadsHeader extends Component {
  state = {
    searchType: 'all',
    searchText: ''
  };

  searchWhenStopTyping = debounce(() => {
    this.props.setSearchText(this.state);
  }, 300);

  handleTextChange = event => {
    this.setState({searchText: event.target.value}, () => {
      this.searchWhenStopTyping();
    });
  };
  handleTypeChange = event => {
    this.setState({searchType: event.target.value}, () => {
      this.props.setSearchText(this.state);
    });
  }

  render() {
    const { classes, types } = this.props;

    return (
      <div
        className={classNames(
          classes.root,
          'flex flex-1 flex-col sm:flex-row items-center justify-between p-24'
        )}
      >
        <div className="flex flex-1 items-center">
          <div className="flex items-center">
            <FuseAnimate animation="transition.expandIn" delay={300}>
              <Icon className="text-32 mr-12">account_box</Icon>
            </FuseAnimate>
            <FuseAnimate animation="transition.slideLeftIn" delay={300}>
              <Typography variant="title">Typeahead</Typography>
            </FuseAnimate>
          </div>
        </div>

        <div className="flex items-end">
          <FuseAnimate animation="transition.expandIn" delay={300}>
            <Icon color="action">search</Icon>
          </FuseAnimate>

          <FuseAnimate animation="transition.slideLeftIn" delay={300}>
            <FormControl className={classes.container} noValidate autoComplete="off">
              <Grid container spacing={8}>
                <Grid item>
                  <Select
                    style={{ width: '160px' }}
                    value={this.state.searchType}
                    name="searchType"
                    id="searchType"
                    onChange={this.handleTypeChange}
                    inputProps={{
                      name: 'searchType',
                      id: 'searchType'
                    }}
                  >
                    {types &&
                      types.map(type => <MenuItem key={type.id} value={type.name}>{type.description}</MenuItem>)}
                  </Select>
                </Grid>
                <Grid item>
                  <TextField
                    style={{ width: '140px' }}
                    placeholder="Search Name"
                    value={this.state.searchText}
                    onChange={this.handleTextChange}
                    name="searchText"
                    id="searchText"
                    inputProps={{
                      'aria-label': 'Search'
                    }}
                  />
                </Grid>
              </Grid>
            </FormControl>
          </FuseAnimate>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setSearchText: Actions.setSearchText
    },
    dispatch
  );
}

function mapStateToProps({ typeaheadsApp }) {
  return {
    searchText: typeaheadsApp.typeaheads.searchText,
    searchType: typeaheadsApp.typeaheads.searchType,
    types: typeaheadsApp.typeaheads.types
  };
}

export default withStyles(styles, { withTheme: true })(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TypeaheadsHeader)
);
