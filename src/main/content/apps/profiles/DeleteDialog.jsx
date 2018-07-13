import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export class deleteDialog extends Component {
  render() {
    const { profile, open, handleClose, removeProfile } = this.props;
    return (
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="Profile delete confirmation"
          aria-describedby="are you sure you want delete this profile?"
        >
          <DialogTitle id="alert-dialog-title">Delete Profile?</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <div className="mb-16">Are you sure you want to delete this profile:</div>
              <strong>Name:</strong> {`${profile.first_name} ${profile.last_name}`}
              <br />
              <strong>Description:</strong> {profile.description}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Disagree
            </Button>
            <Button
              onClick={async () => {
                console.log('remove Profile');
                await removeProfile(profile.id);
                handleClose();
              }}
              color="primary"
              autoFocus
            >
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default deleteDialog;
