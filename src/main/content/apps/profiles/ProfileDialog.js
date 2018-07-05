import React, { Component } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  Icon,
  Typography,
  Toolbar,
  AppBar,
  Avatar
} from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import green from '@material-ui/core/colors/green';
import { withStyles } from '@material-ui/core/styles/index';
import { bindActionCreators } from 'redux';
import * as Actions from './store/actions';
import { connect } from 'react-redux';

import ProfileForm from './ProfileForm';

const styles = theme => ({
  root: {},
  formControl: {
    marginBottom: 24
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: 'relative'
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  error: {
    backgroundColor: theme.palette.error.dark,
    margin: theme.spacing.unit,
    padding: '3px 12px'
  },
  message: {
    display: 'flex',
    alignItems: 'center'
  }
});

class ProfileDialog extends Component {
  closeComposeDialog = () => {
    this.props.profileDialog.type === 'edit'
      ? this.props.closeEditProfileDialog()
      : this.props.closeNewProfileDialog();
    this.props.resetAddProfile();
  };

  canBeSubmitted() {
    // const { first_name, last_name, description } = this.state;
    // return first_name.trim() && last_name.trim();
    return false;
  }

  render() {
    const {
      classes,
      profileDialog: { data, type, props: dialogProps },
      addProfile,
      updateProfile,
      industries,
      countries,
      categories,
      addingProfile,
      addedProfile,
      addedProfileId,
      resetAddProfile
    } = this.props;

    let profile = {};
    for (let key in data) {
      if (typeof data[key] === 'object' && data[key] !== null) {
        profile[key] = data[key].id;
      } else {
        profile[key] = data[key];
      }
    }

    return (
      <Dialog
        className={classes.root}
        {...dialogProps}
        onClose={this.closeComposeDialog}
        fullWidth
        maxWidth="xs"
      >
        <AppBar
          position="static"
          color={addedProfile ? 'secondary' : 'primary'}
          style={{ transition: 'color 0.2s' }}
        >
          <Toolbar className="flex w-full">
            <Typography variant="subheading" color="inherit">
              {type === 'new' ? 'New Profile' : 'Edit Profile'}
            </Typography>
          </Toolbar>
          <div className="flex flex-col items-center justify-center pb-24">
            <Avatar
              className="w-96 h-96"
              alt="profile avatar"
              src={data.profile_picture || 'assets/images/avatars/profile.jpg'}
            />
            {type === 'edit' && (
              <Typography variant="title" color="inherit" className="pt-8">
                {data.name}
              </Typography>
            )}
          </div>
        </AppBar>

        <DialogContent classes={{ root: 'p-24' }}>
          {addedProfile ? (
            <FuseAnimate animation="transition.expandIn" delay={300}>
              <React.Fragment>
                <div align="center">
                  <Icon className="mt-8" style={{ fontSize: 36 }} color="secondary">
                    check_circle
                  </Icon>
                  <Typography
                    variant="subheading"
                    align="center"
                    className="py-8"
                    color="secondary"
                  >
                    {addedProfile}
                  </Typography>
                </div>
                <div className={classes.wrapper} justify="center">
                  <Button
                    variant="raised"
                    color="primary"
                    onClick={() => {
                      resetAddProfile();
                    }}
                  >
                    Add Another
                  </Button>
                  <Button
                    href={`/apps/profile/${addedProfileId}`}
                    className={classes.button}
                    color="primary"
                  >
                    View Profile <Icon className={classes.rightIcon}>exit_to_app</Icon>
                  </Button>
                </div>
              </React.Fragment>
            </FuseAnimate>
          ) : (
            <ProfileForm
              {...{
                industries,
                countries,
                categories,
                addingProfile,
                addProfile,
                updateProfile
              }}
              initialValues={profile || {}}
            />
          )}
        </DialogContent>
      </Dialog>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      closeEditProfileDialog: Actions.closeEditProfileDialog,
      closeNewProfileDialog: Actions.closeNewProfileDialog,
      addProfile: Actions.addProfile,
      updateProfile: Actions.updateProfile,
      removeProfile: Actions.removeProfile,
      resetAddProfile: Actions.resetAddProfile
    },
    dispatch
  );
}

function mapStateToProps({ profilesApp }) {
  const { profiles } = profilesApp;
  const {
    profileDialog,
    addingProfile,
    addedProfile,
    addedProfileId,
    errors
  } = profilesApp.profiles;
  return {
    profileDialog,
    addingProfile,
    addedProfile,
    addedProfileId,
    errors
  };
}

export default withStyles(styles, { withTheme: true })(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProfileDialog)
);
