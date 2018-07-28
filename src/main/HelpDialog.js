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

var registerServiceWorker = require('../registerServiceWorker.js')
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

    handleReload = async () => {
        registerServiceWorker.unregister()
        await wait(1000)
        window.location.assign('/index.html')
    }
    
    wait = async (ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
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
                    <Button onClick={this.handleReload} color="secondary">
                        Reload Appplication
                        <Icon>refresh</Icon>
                    </Button>
                    <Button onClick={this.handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>)
    }
}