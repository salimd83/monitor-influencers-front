import React, { Component } from "react";
import { Icon, Typography, IconButton, Grid } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { FuseAnimate } from "@fuse";
import "react-select/dist/react-select.css";
import ProfileFilter from "./filters/ProfileFilter";
import DateFilter from "./filters/DateFilter";
import moment from "moment";

class InsightHeader extends Component {
  handleDateFromChange = from => {
    const { setFilters, to, profile } = this.props;
    setFilters(profile, from, to, false);
  };
  handleDateToChange = to => {
    const { setFilters, from, profile } = this.props;
    setFilters(profile, from, to, false);
  };
  handleProfileChange = profile => {
    const { setFilters, from, to } = this.props;
    setFilters(profile, from, to, false);
  };

  handleClick = () => {
    const { from, to, profile } = this.props;
    const strFrom = moment(from).toISOString();
    const strTo = moment(to).toISOString();

      this.props.history.push(`/insight/${profile.value}/${strFrom}/${strTo}`)
    this.props.setFilters(profile, strFrom, strTo);
  };

  render() {
    const { profile, to, from } = this.props;
    const { handleDateFromChange, handleDateToChange, handleClick } = this;

    return (
      <Grid
        container
        spacing={16}
        alignItems="center"
        direction="row"
        justify="space-between"
        className="cardedPageHeader"
      >
        <Grid item>
          <div className="flex items-center">
            <FuseAnimate animation="transition.expandIn" delay={300}>
              <Icon className="text-32 mr-12">account_box</Icon>
            </FuseAnimate>
            <FuseAnimate animation="transition.slideLeftIn" delay={300}>
              <Typography variant="title">Insights</Typography>
            </FuseAnimate>
          </div>
        </Grid>
        <Grid item>
          <div className="flex items-center filters">
            <Grid container spacing={16} alignItems="center" direction="row">
              <Grid item>
                <DateFilter
                  {...{
                    to,
                    from,
                    handleDateFromChange,
                    handleDateToChange
                  }}
                />
              </Grid>
              <Grid item id="profileFilter">
                <ProfileFilter handleChange={this.handleProfileChange} selected={profile} />
              </Grid>
              <Grid>
                <IconButton onClick={handleClick} aria-label="Delete">
                  <Icon>check_circle</Icon>
                </IconButton>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    );
  }
}

export default withRouter(InsightHeader);
