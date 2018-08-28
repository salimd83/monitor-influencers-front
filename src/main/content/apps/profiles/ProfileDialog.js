import React, { Component } from "react";
import { Dialog, DialogContent, Typography, Toolbar, AppBar, Avatar } from "@material-ui/core";
import { FuseAnimate } from "@fuse";
import { bindActionCreators } from "redux";
import * as Actions from "./store/actions";
import { connect } from "react-redux";

import ProfileForm from "./ProfileForm";
import ProfileAddSuccess from "./ProfileAddSuccess";

class ProfileDialog extends Component {
  closeComposeDialog = () => {
    this.props.profileDialog.type === "edit" ? this.props.closeEditProfileDialog() : this.props.closeNewProfileDialog();
    this.props.resetAddProfile();
  };

  render() {
    const {
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
      if (typeof data[key] === "object" && data[key] !== null) {
        profile[key] = data[key].id;
      } else {
        profile[key] = data[key];
      }
    }

    return (
      <Dialog {...dialogProps} onClose={this.closeComposeDialog} fullWidth>
        <AppBar position="static" color={addedProfile ? "secondary" : "primary"} style={{ transition: "color 0.2s" }}>
          <Toolbar className="flex w-full">
            <Typography variant="subheading" color="inherit">
              {type === "new" ? "New Profile" : "Edit Profile"}
            </Typography>
          </Toolbar>
          <div className="flex flex-col items-center justify-center pb-24">
            <Avatar
              className="w-96 h-96"
              alt="profile avatar"
              src={data.profile_picture || "assets/images/avatars/profile.jpg"}
            />
            {type === "edit" && (
              <Typography variant="title" color="inherit" className="pt-8">
                {data.name}
              </Typography>
            )}
          </div>
        </AppBar>

        <DialogContent className="p-24">
          {addedProfile ? (
            <FuseAnimate animation="transition.expandIn" delay={300}>
              <ProfileAddSuccess {...{ addedProfileId, resetAddProfile, addedProfile }} />
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

function mapStateToProps({ profilesApp: { profiles } }) {
  const { profileDialog, addingProfile, addedProfile, addedProfileId } = profiles;
  return {
    profileDialog,
    addingProfile,
    addedProfile,
    addedProfileId
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileDialog);
