import React, { Component } from "react";
import { Icon, TextField, Input, Typography, InputAdornment, IconButton } from "@material-ui/core";
import * as Actions from "./store/actions";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { FuseAnimate } from "@fuse";
import { debounce } from "lodash";

class ProfilesHeader extends Component {
  searchWhenStopTyping = debounce(() => {
    const { history, searchText } = this.props;
    history.push(`/admin/profiles/${searchText}`);
  }, 800);

  handleChange = e => {
    this.props.setSearchText(e.target.value);
    this.searchWhenStopTyping();
  };
  render() {
    const { searchText } = this.props;
    return (
      <div className="flex flex-1 flex-col sm:flex-row justify-between p-24">
        <div className="flex">
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
          {/* <FuseAnimate animation="transition.expandIn" delay={300}>
            <Icon color="action">search</Icon>
          </FuseAnimate> */}

          <FuseAnimate animation="transition.slideLeftIn" delay={300}>
            <Input
              placeholder="Search for anything"
              fullWidth
              value={searchText}
              inputProps={{
                "aria-label": "Search"
              }}
              onChange={this.handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <Icon color="action">search</Icon>
                </InputAdornment>
              }
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

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProfilesHeader)
);
