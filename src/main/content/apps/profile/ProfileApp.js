import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FusePageSimple, FuseAnimate } from '@fuse';
import { Avatar, Button, Tab, Tabs, Typography } from '@material-ui/core';
import TimelineTab from 'main/content/apps/profile/tabs/TimelineTab';
import PhotosVideosTab from 'main/content/apps/profile/tabs/PhotosVideosTab';
import AboutTab from 'main/content/apps/profile/tabs/AboutTab';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from './store/actions';

const styles = theme => ({
  layoutRoot: {},
  layoutToolbar: {
    padding: 0
  },
  layoutHeader: {
    height: 220,
    minHeight: 220,
    background:
      "url('/assets/images/backgrounds/dark-material-bg.jpg') no-repeat",
    backgroundSize: 'cover',
    color: '#fff',
    [theme.breakpoints.down('md')]: {
      height: 240,
      minHeight: 240
    }
  },
  tabsRoot: {
    height: 64,
    width: '100%'
  },
  tabRoot: {
    height: 64
  }
});

class ProfilePage extends Component {
  state = {
    value: 0,
    first_name: null,
    last_name: null,
    profile_picture: null,
    links: []
  };

  componentDidMount() {
    this.props.getProfile(this.props.match.params);
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const {
      classes,
      profile,
      links,
      openNewLinkDialog,
      linkDialog
    } = this.props;
    const { value } = this.state;

    return (
      <FusePageSimple
        classes={{
          root: classes.layoutRoot,
          header: classes.layoutHeader,
          toolbar: classes.layoutToolbar
        }}
        header={
          <div className="p-24 flex flex-1 flex-col items-center justify-center md:flex-row md:items-end">
            <div className="flex flex-1 flex-col items-center justify-center md:flex-row md:items-center md:justify-start">
              <FuseAnimate animation="transition.expandIn" delay={300}>
                <Avatar className="w-96 h-96" src={profile.profile_picture} />
              </FuseAnimate>
              <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                <span>
                  <Typography
                    className="md:ml-24"
                    variant="display1"
                    color="inherit"
                    gutterBottom
                  >
                    {profile.first_name} {profile.last_name}
                  </Typography>
                  <Typography className="md:ml-24" variant="subheading">
                    820 Folowers
                  </Typography>
                </span>
              </FuseAnimate>
            </div>

            <div className="">
              {links.map(link => (
                <div style={{ textAlign: 'right' }} className="md:mb-8">
                  <a href="#">
                    {link.value}
                    <i className={`fab fa-${link.type} md:ml-8`} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        }
        contentToolbar={
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            scrollable
            scrollButtons="auto"
            classes={{
              root: classes.tabsRoot
            }}
          >
            <Tab
              classes={{
                root: classes.tabRoot
              }}
              label="Timeline"
            />
            <Tab
              classes={{
                root: classes.tabRoot
              }}
              label="About"
            />
            <Tab
              classes={{
                root: classes.tabRoot
              }}
              label="Photos & Videos"
            />
          </Tabs>
        }
        content={
          <div className="p-24">
            {value === 0 && <TimelineTab />}
            {value === 1 && (
              <AboutTab {...{ links, profile, openNewLinkDialog }} />
            )}
            {value === 2 && <PhotosVideosTab />}
          </div>
        }
      />
    );
  }
}

function mapDispatchToProdps(dispatch) {
  return bindActionCreators(
    {
      getProfile: Actions.getProfile,
      getUserData: Actions.getUserData,
      openNewLinkDialog: Actions.openNewLinkDialog
    },
    dispatch
  );
}

function mapStateToProps({ profileApp }) {
  const { profile, linkDialog } = profileApp;
  return { ...profile, linkDialog };
}

export default withStyles(styles, { withTheme: true })(
  connect(
    mapStateToProps,
    mapDispatchToProdps
  )(ProfilePage)
);
