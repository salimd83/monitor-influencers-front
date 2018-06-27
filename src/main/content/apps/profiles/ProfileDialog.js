import React, { Component } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Icon,
  Typography,
  Toolbar,
  AppBar,
  Avatar,
    SnackbarContent,
  CircularProgress
} from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import green from '@material-ui/core/colors/green';
import { withStyles } from '@material-ui/core/styles/index';
import { bindActionCreators } from 'redux';
import * as Actions from './store/actions';
import { connect } from 'react-redux';
import _ from 'lodash';

import ProfileForm from './ProfileForm';

const styles = theme => ({
    root        : {},
    formControl : {
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
    wrapper     : {
    margin: theme.spacing.unit,
    position: 'relative'
  },
    rightIcon   : {
    marginLeft: theme.spacing.unit
  },
    error       : {
        backgroundColor: theme.palette.error.dark,
        margin         : theme.spacing.unit,
        padding        : '3px 12px'
    },
    message     : {
        display   : 'flex',
        alignItems: 'center'
    }
});

const newProfileState = {
    id          : '',
    first_name  : '',
    last_name   : '',
    description : '',
    industry    : '',
    category    : '',
    location    : '',
    country     : '',
  internal_notes: ''
};

const initErrors = {
    first_name   : false,
    last_name    : false,
    description  : false,
    email        : false,
    internat_note: false
}

class ProfileDialog extends Component {
  state = {
    ...newProfileState,
      errors: initErrors
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    /**
     * After Dialog Open
     */
    if (
      !prevProps.profileDialog.props.open &&
      this.props.profileDialog.props.open
    ) {
      /**
       * Dialog type: 'edit'
       * Update State
       */
      if (
        this.props.profileDialog.type === 'edit' &&
        this.props.profileDialog.data &&
        !_.isEqual(this.props.profileDialog.data, prevState)
      ) {
        this.setState({
          ...this.state,
          ...this.props.profileDialog.data,
                          errors  : initErrors,
                          industry: this.props.profileDialog.data.industry.id,
                          category: this.props.profileDialog.data.category.id
        });
      }

      /**
       * Dialog type: 'new'
       * Update State
       */
      if (
        this.props.profileDialog.type === 'new' &&
        !_.isEqual(newProfileState, prevState)
      ) {
          this.setState({
                            ...this.state,
                            errors: initErrors, ...newProfileState
                        })
      }
    }
  }

  validate = ({
    name,
    type = '',
    required = false,
    min = false,
    max = false
  }) => {
    const errors = {};
    let value = this.state[name] || '';
    value = value.trim();

    if (required && (!value || value === '')) errors[name] = 'Required';
    else if (required) errors[name] = false;

    if (value !== '' && value != null) {
      if (min && value.length < min)
        errors[name] = `must be less than ${min} characters.`;
      else errors[name] = false;

      if (max && value.length > max)
        errors[name] = `must be less than ${max} characters.`;
      else errors[name] = false;

      if (
        type === 'email' &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
      )
        errors.email = 'Invalid email address';
      else errors.email = false;
    }

    this.setState({
      ...this.state,
      errors: { ...this.state.errors, ...errors }
    });
  };

  handleChange = event => {
    this.setState(
      _.set(
        { ...this.state },
        event.target.name,
        event.target.type === 'checkbox'
          ? event.target.checked
          : event.target.value
      )
    );
  };

  closeComposeDialog = () => {
    this.props.profileDialog.type === 'edit'
      ? this.props.closeEditProfileDialog()
      : this.props.closeNewProfileDialog();
    this.props.resetAddProfile();
  };

  canBeSubmitted() {
      const {first_name, last_name, description} = this.state
      return first_name.trim() && last_name.trim() && description.trim()
  }

  render() {
    const {
      classes,
      profileDialog,
      addProfile,
      updateProfile,
      industries,
      countries,
      categories,
      addingProfile,
      addedProfile, addedProfileId, resetAddProfile, errors
    } = this.props;

    let actionButtons;
    if (profileDialog.type === 'new') {
      if (addedProfile) {
        actionButtons = (
          <div className={classes.wrapper} justify="center">
            <Button
              variant="raised"
              color="primary"
              className="mr-8 ml-16"
              onClick={() => {
                this.setState({ ...newProfileState, ...this.state });
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
              View Profile{' '}
              <Icon className={classes.rightIcon}>exit_to_app</Icon>
            </Button>
          </div>
        );
      } else {
        actionButtons = (
          <div className={classes.wrapper}>
            <Button
              variant="raised"
              color="primary"
              onClick={() => {
                addProfile(this.state);
              }}
              disabled={!this.canBeSubmitted() || addingProfile}
            >
              Add
            </Button>
            {addingProfile && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
        );
      }
    } else {
      actionButtons = (
        <Button
          variant="raised"
          color="primary"
          onClick={() => {
            updateProfile(
              _.omit(this.state, [
                'errors',
                'tags',
                'active',
                'profile_picture'
              ])
            );
          }}
          disabled={!this.canBeSubmitted()}
        >
          Save
        </Button>
      );
    }

    return (
      <Dialog
        className={classes.root}
        {...profileDialog.props}
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
              {profileDialog.type === 'new' ? 'New Profile' : 'Edit Profile'}
            </Typography>
          </Toolbar>
          <div className="flex flex-col items-center justify-center pb-24">
            <Avatar
              className="w-96 h-96"
              alt="profile avatar"
              src={
                this.state.profile_picture ||
                'assets/images/avatars/profile.jpg'
              }
            />
            {profileDialog.type === 'edit' && (
              <Typography variant="title" color="inherit" className="pt-8">
                {this.state.name}
              </Typography>
            )}
          </div>
        </AppBar>

        <DialogContent classes={{ root: 'p-24' }}>
            {errors && errors.map(err => (<SnackbarContent
                className={classes.error}
                aria-describedby="client-snackbar"
                message={err}
            />))}
            <br/>
          {addedProfile ? (
            <FuseAnimate animation="transition.expandIn" delay={300}>
              <div align="center">
                <Icon
                  className="mt-8"
                  style={{ fontSize: 36 }}
                  color="secondary"
                >
                  check_circle
                </Icon>
                <Typography
                  variant="subheading"
                  align="center"
                  className="pt-8"
                  color="secondary"
                >
                  {addedProfile}
                </Typography>
              </div>
            </FuseAnimate>
          ) : (
            <ProfileForm
              {...{
                industries,
                countries,
                categories,
                addingProfile,
                validate: this.validate,
                handleChange: this.handleChange,
                ...this.state
              }}
            />
          )}
        </DialogContent>

        <DialogActions className="justify-between pl-16">
          {actionButtons}
        </DialogActions>
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
    const {profiles} = profilesApp
    const {
              profileDialog, addingProfile, addedProfile, addedProfileId, errors
          }          = profilesApp.profiles
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
