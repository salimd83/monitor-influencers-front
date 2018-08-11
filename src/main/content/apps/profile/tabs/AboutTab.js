import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles/index";
import { AppBar, Card, CardContent, Toolbar, Typography } from "@material-ui/core";
import classNames from "classnames";
import _ from "lodash";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as Actions from "../store/actions";
import Links from "../links/Links";
import Tags from "../tags/Tags";

const styles = theme => ({});

class AboutTab extends Component {
  handleChange = event => {
    this.setState(
      _.set(
        { ...this.state },
        event.target.name,
        event.target.type === "checkbox" ? event.target.checked : event.target.value
      )
    );
  };

  render() {
      const {classes, profile, deleteTag, tags, addTag} = this.props

    return (
      <div className={classNames(classes.root, "md:flex max-w-2xl")}>
        <div className="flex flex-col flex-1 md:pr-32">
            {/* <FuseAnimateGroup
            enter={{
              animation: "transition.slideUpBigIn"
            }}
          > */}
          {!_.isEmpty(profile) && (
              <Tags
                {...{
                  tags,
                  deleteTag,
                  addTag,
                  profile
                }}
              />
            )}
            {!_.isEmpty(profile) && (
              <Card className="w-full mb-16">
                <AppBar position="static" elevation={0}>
                  <Toolbar className="pl-16 pr-8">
                    <Typography variant="subheading" color="inherit" className="flex-1">
                      General Information
                    </Typography>
                  </Toolbar>
                </AppBar>

                <CardContent>
                  <div className="mb-24">
                    <Typography className="font-bold mb-4 text-15">Description</Typography>
                    <Typography>{profile.description}</Typography>
                  </div>

                  <div className="mb-24">
                    <Typography className="font-bold mb-4 text-15">Category</Typography>
                    <Typography>{profile.category.name}</Typography>
                  </div>

                  <div className="mb-24">
                    <Typography className="font-bold mb-4 text-15">Country</Typography>
                    <Typography>{profile.country.name}</Typography>
                  </div>

                  <div className="mb-24">
                    <Typography className="font-bold mb-4 text-15">Location</Typography>
                    <Typography>{profile.location.name}</Typography>
                  </div>

                  <div className="mb-24">
                    <Typography className="font-bold mb-4 text-15">Industry</Typography>
                    <Typography>{profile.industry.name}</Typography>
                  </div>

                  <div className="mb-24">
                    <Typography className="font-bold mb-4 text-15">Internal Notes</Typography>
                    <Typography>{profile.internal_notes}</Typography>
                  </div>
                </CardContent>
              </Card>
            )}


        </div>

        {/* Links Section */}
        <Links />
      </div>
    );
  }
}

function mapDispatchToProdps(dispatch) {
  return bindActionCreators(
    {
      addTag: Actions.addTag,
      deleteTag: Actions.deleteTag
    },
    dispatch
  );
}

export default withStyles(styles, { withTheme: true })(
  connect(
      null,
    mapDispatchToProdps
  )(AboutTab)
);
