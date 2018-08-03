import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export class deleteDialog extends Component {
  render() {
    const { typeahead, open, handleClose, deleteTypeahead } = this.props;
    return (
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="Typeahead delete confirmation"
          aria-describedby="are you sure you want delete this typeahead?"
        >
          <DialogTitle id="alert-dialog-title"><span style={{color: "#f44336"}}>Delete Typeahead?</span></DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <div className="mb-16">Are you sure you want to delete this typeahead:</div>
              Title/type: <strong  style={{color: "#f44336"}}>{`${typeahead.name}/${typeahead.type}`}</strong>
              <br />
              Description: {typeahead.description}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Disagree
            </Button>
            <Button
              onClick={async () => {
                console.log('remove Typeahead');
                await deleteTypeahead(typeahead.id);
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
