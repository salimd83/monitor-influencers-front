import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles/index';
import { Hidden, Icon, IconButton, TextField, Typography } from '@material-ui/core';
import * as Actions from './store/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { FuseAnimate } from '@fuse';
import { debounce } from 'lodash';

const styles = theme => ({
  root: {}
});

class ProfilesHeader extends Component {
  state = {
    keyword: ''
  };

  searchWhenStopTyping = debounce(() => {
    this.props.setSearchText(this.state.keyword);
  }, 800);

  handleChange = e => {
    this.setState({ keyword: e.target.value }, () => {
      this.searchWhenStopTyping();
    });
  };
  render() {
    const { classes, pageLayout } = this.props;
    return (
      <div
        className={classNames(
          classes.root,
          'flex flex-1 flex-col sm:flex-row items-center justify-between p-24'
        )}
      >
        <div className="flex flex-1 items-center">
          <Hidden lgUp>
            <IconButton
              onClick={ev => pageLayout().toggleLeftSidebar()}
              aria-label="open left sidebar"
            >
              <Icon>menu</Icon>
            </IconButton>
          </Hidden>

          <div className="flex items-center">
            <FuseAnimate animation="transition.expandIn" delay={300}>
              <Icon className="text-32 mr-12">account_box</Icon>
            </FuseAnimate>
            <FuseAnimate animation="transition.slideLeftIn" delay={300}>
              <Typography variant="title">Profiles</Typography>
            </FuseAnimate>
          </div>
        </div>

        <div className="flex items-center">
          <FuseAnimate animation="transition.expandIn" delay={300}>
            <Icon color="action">search</Icon>
          </FuseAnimate>

          <FuseAnimate animation="transition.slideLeftIn" delay={300}>
            <TextField
              placeholder="Search for anything"
              className="pl-16"
              fullWidth
              value={this.state.keyword}
              inputProps={{
                'aria-label': 'Search'
              }}
              onChange={this.handleChange}
            />
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

function mapStateToProps({ profilesApp }) {
  return {
    searchText: profilesApp.profiles.searchText
  };
}

export default withStyles(styles, { withTheme: true })(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProfilesHeader)
);
