import React, { Component } from "react";
import { Grid, Typography, Icon, Chip, Avatar, Divider } from "@material-ui/core";
import { FuseUtils } from "@fuse";

export class LeaderboardProfile extends Component {
  toggleSelected = profile => () => {
    this.props.toggleProfileSelect(profile);
  }
  render() {
    const { profile, selectedProfiles } = this.props;
    const isSelected = selectedProfiles.map(pro => pro.id).includes(profile.id);
    const selectClass = isSelected ? 'selected' : '';
    return (
      <Grid container className={`profile ${selectClass}`}>
        <Grid item sm={2} xs={12}>
          <div className="photo" onClick={this.toggleSelected(profile)}>
            <img src={profile.profile_picture} alt="" />
            <span><Icon color="secondary">check_circle</Icon></span>
          </div>
        </Grid>
        <Grid item sm={10} xs={12}>
          <div className="info">
            <Grid container>
              <Grid item xs={6}>
                <Typography color="secondary" variant="subheading">{`${profile.first_name} ${profile.last_name}`}</Typography>
              </Grid>
              <Grid item xs={6}>
                <div className="links statics">
                  {profile.links &&
                    profile.links.map(link => {
                      let faType = link.type;
                      switch (link.type) {
                        case "facebook":
                          faType = "facebook-f";
                          break
                        case "snapchat":
                          faType = "snapchat-ghost";
                          break;
                        case "website":
                        case "rss":
                          faType = "wordpress-simple";
                      }
                      return (
                        <a
                          key={link.id}
                          href={`http://www.${link.type}.com/${link.value}`}
                          target="_blank"
                          className={link.type}
                        >
                          <i className={`fab fa-${faType}`} />{" "}
                          {link.type === "instagram" ? FuseUtils.kFormatter(profile.insights.followers_count) : 0}
                        </a>
                      );
                    })}
                </div>
              </Grid>
            </Grid>

            <Divider />

            <Grid container className="description">
              <Grid item>
                <Typography className="pt-12 brief-metrics" component="p">
                  <span>{profile.location && profile.location.name}</span>
                  <span>
                    {profile.category && profile.category.name + " /"} {profile.industry && profile.industry.name}
                  </span>
                  <span>{FuseUtils.kFormatter(profile.insights.media_count)} Posts</span>
                </Typography>
              </Grid>

              <Grid item style={{ alignSelf: "flex-end" }} className="mt-8">
                <Typography variant="body1" component="p" color="textSecondary">
                  {profile.description.substring(0, 120)}
                  ...
                </Typography>

                <div className="tags">
                  {profile.tags &&
                    profile.tags.map(tag => (
                      <span key={tag.id} className="mb-4">{tag.name} /</span>
                    ))}
                </div>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    );
  }
}

export default LeaderboardProfile;
