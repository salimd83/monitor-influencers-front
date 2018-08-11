import React, { Component } from "react";
import { Grid, Typography, Icon, Chip, Avatar, Divider } from "@material-ui/core";

export class LeaderboardProfile extends Component {
  render() {
    const { profile } = this.props;
    return (
      <Grid container>
        <Grid item sm={3} xs={4}>
          <div className="photo">
            <img src={profile.profile_picture} alt="" />
          </div>
        </Grid>
        <Grid item sm={9} xs={8}>
          <div className="info">
            <Grid container>
              <Grid item xs={6}>
                <h4>{`${profile.first_name} ${profile.last_name}`}</h4>
              </Grid>
              <Grid item xs={6}>
                <div className="statics">
                  <span className="primary">
                    <Icon>adjust</Icon> {Intl.NumberFormat()
                                             .format(profile.insights.media_count)}
                  </span>
                  <span className="primary">
                    <Icon>people</Icon> {Intl.NumberFormat()
                                             .format(profile.insights.followers_count)}
                  </span>
                </div>
              </Grid>
            </Grid>

            <Divider />

            <div className="links mt-8">
              {profile.links &&
                profile.links.map(link => {
                  let faType = link.type;
                  if (link.type === "facebook") {
                    faType = "facebook-f";
                  }
                  return (
                    <a
                      key={link.id}
                      href={`http://www.${link.type}.com/${link.value}`}
                      target="_blank"
                      className={link.type}
                    >
                      <i className={`fab fa-${faType}`} />
                    </a>
                  );
                })}
            </div>

            <Typography variant="subheading">
              {profile.category && profile.category.name}
            </Typography>
            <Typography variant="body1" component="p" color="textSecondary">
              {profile.description}
            </Typography>
            <Typography className="pt-8" component="p">
              <Icon>place</Icon>
              {profile.location && profile.location.name}
            </Typography>

            <div className="tags mt-16">
              {profile.tags &&
                profile.tags.map(tag => (
                  <Chip
                    key={tag.id}
                    avatar={
                      <Avatar>
                        <Icon style={{fontSize: '17px'}}>local_offer</Icon>
                      </Avatar>
                    }
                    label={tag.name}
                  />
                ))}
            </div>
          </div>
        </Grid>
      </Grid>
    );
  }
}

export default LeaderboardProfile;
