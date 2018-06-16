import React, { Component } from 'react';
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  InputLabel,
  Input,
  Select,
  Icon,
  IconButton,
  Typography,
  Toolbar,
  AppBar,
  Avatar,
  MenuItem
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles/index';
import { bindActionCreators } from 'redux';
import * as Actions from './store/actions';
import { connect } from 'react-redux';
import _ from 'lodash';

const styles = theme => ({
  root: {},
  formControl: {
    marginBottom: 24
  }
});
const newProfileState = {
  id: '',
  first_name: '',
  last_name: '',
  avatar: 'assets/images/avatars/profile.jpg',
  // nickname: '',
  industry: '',
  category: '',
  location: '',
  country: '',
  gender: '',
  primary_language: '',
  facebook_username: '',
  twitter_username: '',
  instagram_username: '',
  snapchat_username: '',
  primary_platform: '',
  internal_notes: '',
  active: true,
  categoryList: [],
  genderList: [],
  languageList: []
};

class ProfileDialog extends Component {
  state = { ...newProfileState };

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
        this.setState({ ...this.props.profileDialog.data });
      }

      /**
       * Dialog type: 'new'
       * Update State
       */
      if (
        this.props.profileDialog.type === 'new' &&
        !_.isEqual(newProfileState, prevState)
      ) {
        this.setState({ ...newProfileState });
      }
    }
  }

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
  };

  canBeSubmitted() {
    const { first_name } = this.state;
    return first_name.length > 0;
  }

  render() {
    const {
      classes,
      profileDialog,
      addProfile,
      updateProfile,
      removeProfile,
      industries,
      countries,
      categories,
      genders
    } = this.props;

    return (
      <Dialog
        className={classes.root}
        {...profileDialog.props}
        onClose={this.closeComposeDialog}
        fullWidth
        maxWidth="xs"
      >
        <AppBar position="static">
          <Toolbar className="flex w-full">
            <Typography variant="subheading" color="inherit">
              {profileDialog.type === 'new' ? 'New Profile' : 'Edit Profile'}
            </Typography>
          </Toolbar>
          <div className="flex flex-col items-center justify-center pb-24">
            <Avatar
              className="w-96 h-96"
              alt="profile avatar"
              src={this.state.avatar}
            />
            {profileDialog.type === 'edit' && (
              <Typography variant="title" color="inherit" className="pt-8">
                {this.state.name}
              </Typography>
            )}
          </div>
        </AppBar>

        <DialogContent classes={{ root: 'p-24' }}>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">account_circle</Icon>
            </div>
            <FormControl className={classes.formControl} required fullWidth>
              <InputLabel htmlFor="first_name">First Name</InputLabel>
              <Input
                autoFocus
                id="first_name"
                name="first_name"
                value={this.state.first_name}
                onChange={this.handleChange}
              />
            </FormControl>
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">account_circle</Icon>
            </div>
            <FormControl className={classes.formControl} fullWidth>
              <InputLabel htmlFor="last_name">Last name</InputLabel>
              <Input
                id="last_name"
                name="last_name"
                value={this.state.last_name}
                onChange={this.handleChange}
              />
            </FormControl>
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">domain</Icon>
            </div>
            <FormControl className={classes.formControl} fullWidth>
              <InputLabel htmlFor="nickname">Industry</InputLabel>

              <Select
                value={this.state.industry}
                onChange={this.handleChange}
                inputProps={{
                  name: 'industry',
                  id: 'industry'
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {industries.map(industry => (
                  <MenuItem key={industry.id} value={industry.id}>
                    {industry.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">note</Icon>
            </div>
            <FormControl className={classes.formControl} fullWidth>
              <InputLabel htmlFor="description">Description</InputLabel>
              <Input
                id="description"
                name="description"
                multiline
                rows="2"
                rowsMax="4"
                value={this.state.description}
                onChange={this.handleChange}
              />
            </FormControl>
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">email</Icon>
            </div>
            <FormControl className={classes.formControl} fullWidth>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                id="email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </FormControl>
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">location_on</Icon>
            </div>
            <FormControl className={classes.formControl} fullWidth>
              <InputLabel htmlFor="country">country</InputLabel>
              <Select
                value={this.state.industry}
                onChange={this.handleChange}
                inputProps={{
                  name: 'country',
                  id: 'country'
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {countries.map(country => (
                  <MenuItem key={country.id} value={country.id}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">home</Icon>
            </div>
            <FormControl className={classes.formControl} fullWidth>
              <InputLabel htmlFor="location">Location</InputLabel>
              <Select
                value={this.state.industry}
                onChange={this.handleChange}
                inputProps={{
                  name: 'location',
                  id: 'location'
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {countries.map(location => (
                  <MenuItem key={location.id} value={location.id}>
                    {location.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">category</Icon>
            </div>
            <FormControl className={classes.formControl} fullWidth>
              <InputLabel htmlFor="location">Category</InputLabel>
              <Select
                value={this.state.category}
                onChange={this.handleChange}
                inputProps={{
                  name: 'category',
                  id: 'category'
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {categories.map(category => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">home</Icon>
            </div>
            <FormControl className={classes.formControl} fullWidth>
              <InputLabel htmlFor="gender">Gender</InputLabel>
              <Select
                value={this.state.gender}
                onChange={this.handleChange}
                inputProps={{
                  name: 'gender',
                  id: 'gender'
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {genders.map(gender => (
                  <MenuItem key={gender.id} value={gender.id}>
                    {gender.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">note</Icon>
            </div>
            <TextField
              className={classes.formControl}
              id="internat_note"
              label="internat_note"
              type="text"
              value={this.state.internat_note}
              multiline
              rows={2}
              maxRows="5"
              fullWidth
            />
          </div>
        </DialogContent>

        {profileDialog.type === 'new' ? (
          <DialogActions className="justify-between pl-16">
            <Button
              variant="raised"
              color="primary"
              onClick={() => {
                addProfile(this.state);
                this.closeComposeDialog();
              }}
              disabled={!this.canBeSubmitted()}
            >
              Add
            </Button>
          </DialogActions>
        ) : (
          <DialogActions className="justify-between pl-16">
            <Button
              variant="raised"
              color="primary"
              onClick={() => {
                updateProfile(this.state);
                this.closeComposeDialog();
              }}
              disabled={!this.canBeSubmitted()}
            >
              Save
            </Button>
            <IconButton
              onClick={() => {
                removeProfile(this.state.id);
                this.closeComposeDialog();
              }}
            >
              <Icon>delete</Icon>
            </IconButton>
          </DialogActions>
        )}
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
      removeProfile: Actions.removeProfile
    },
    dispatch
  );
}

function mapStateToProps({ profilesApp }) {
  return {
    profileDialog: profilesApp.profiles.profileDialog
  };
}

export default withStyles(styles, { withTheme: true })(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProfileDialog)
);
