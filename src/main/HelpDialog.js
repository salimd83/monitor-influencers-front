import React, {Component} from 'react'
import {
    Button,
    Icon,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography
}                         from '@material-ui/core'
import {FuseHighlight}    from '@fuse'

import {
    envDetails,
    hiUser
} from 'fn'

export default class HelpDialog extends Component {


    state = {
        open: false
    }

    handleClickOpen = () => {
        this.setState({open: true})
    }

    handleClose = () => {
        this.setState({open: false})
    }

    render() {
        return (<div>
            <IconButton className="w-64 h-64" onClick={this.handleClickOpen}>
                <Icon>live_help</Icon>
            </IconButton>
            <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Contact Support</DialogTitle>
                <DialogContent>
                    <DialogContentText className={'mb-16'}>
                        <strong>Need assistance?</strong> Please email hello@beaux.media and
                        we'll get you the help you need.
                        Please include the details below in your request to help our team process your request.

                    </DialogContentText>
                    <pre className={'language-markup'}>
                        Version: {envDetails.version};
                        Build: {envDetails.build};
                        Session: {hiUser().baTokenReference}
                    </pre>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>)
    }
}