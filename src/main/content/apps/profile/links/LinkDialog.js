import React, {Component}   from 'react'
import {
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
    MenuItem,
    InputAdornment
}                           from '@material-ui/core'
import {withStyles}         from '@material-ui/core/styles/index'
import {bindActionCreators} from 'redux'
import {connect}            from 'react-redux'
import _                    from 'lodash'

import * as Actions from '../store/actions'

const styles = theme => ({
    root       : {},
    formControl: {
        marginBottom: 24
    }
})

const newLinkState = {
    id   : '',
    type : '',
    title: '',
    value: ''
}

class LinkDialog extends Component {
    state              = {...newLinkState}
    handleChange       = event => {
        this.setState(_.set({...this.state}, event.target.name, event.target.type === 'checkbox' ? event.target.checked
                                                                                                 : event.target.value))
    }
    closeComposeDialog = () => {
        this.props.linkDialog.type === 'edit' ? this.props.closeEditLinkDialog() : this.props.closeNewLinkDialog()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        /**
         * After Dialog Open
         */
        if (!prevProps.linkDialog.props.open && this.props.linkDialog.props.open) {
            /**
             * Dialog type 'edit'
             * Update State
             */
            if (this.props.linkDialog.type === 'edit' && this.props.linkDialog.data && !_.isEqual(this.props.linkDialog.data, prevState)) {
                this.setState({...this.props.linkDialog.data})
            }

            /**
             * Dialog type 'new'
             * Update State
             */
            if (this.props.linkDialog.type === 'new' && !_.isEqual(newLinkState, prevState)) {
                this.setState({...newLinkState})
            }
        }
    }

    canBeSubmitted() {
        const {title, type, value} = this.state
        return (title.length > 0 && type.length > 0 && value.length > 0)
    }

    render() {
        const {
                  classes, linkDialog, addLink, updateLink, removeLink, profileId
              }                    = this.props
        const {title, type, value} = this.state
        const typeList             = [
            'facebook',
            'instagram',
            'twitter',
            'youtube',
            'snapchat',
            'website',
            'personalWebsite',
            'businessWebsite',
            'other'
        ]

        return (<Dialog
            className={classes.root}
            {...linkDialog.props}
            onClose={this.closeComposeDialog}
            fullWidth
            maxWidth="xs"
        >
            <AppBar position="static">
                <Toolbar className="flex w-full">
                    <Typography variant="subheading" color="inherit">
                        {newLinkState.type === 'new' ? 'New Link' : 'Edit Link'}
                    </Typography>
                </Toolbar>
            </AppBar>

            <DialogContent classes={{root: 'p-24'}}>
                <div className="flex">
                    <div className="min-w-48 pt-20">
                        <Icon color="action">Title</Icon>
                    </div>
                    <FormControl className={classes.formControl} required fullWidth>
                        <InputLabel htmlFor="first_name">Title</InputLabel>
                        <Input
                            autoFocus
                            id="title"
                            name="title"
                            value={title}
                            onChange={this.handleChange}
                        />
                    </FormControl>
                </div>

                <div className="flex">
                    <div className="min-w-48 pt-20">
                        <Icon color="action">category</Icon>
                    </div>
                    <FormControl className={classes.formControl} fullWidth>
                        <InputLabel htmlFor="type">Type</InputLabel>

                        <Select
                            value={type}
                            onChange={this.handleChange}
                            inputProps={{
                                name: 'type',
                                id  : 'type'
                            }}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {typeList.map((type, i) => (<MenuItem key={i} value={type}>
                                {_.startCase(_.toLower(type))}
                            </MenuItem>))}
                        </Select>
                    </FormControl>
                </div>

                <div className="flex">
                    <div className="min-w-48 pt-20">
                        <Icon color="action">attach_file</Icon>
                    </div>
                    <FormControl className={classes.formControl} required fullWidth>
                        <InputLabel htmlFor="value">Value</InputLabel>
                        <Input
                            id="value"
                            name="value"
                            value={value}
                            onChange={this.handleChange}
                        />
                    </FormControl>
                </div>
            </DialogContent>
            {linkDialog.type === 'new' ? (<DialogActions className="justify-between pl-16">
                <Button
                    variant="raised"
                    color="primary"
                    onClick={() => {
                        addLink(this.state, profileId)
                        this.closeComposeDialog()
                    }}
                    disabled={!this.canBeSubmitted()}
                >
                    Add
                </Button>
            </DialogActions>) : (<DialogActions className="justify-between pl-16">
                <Button
                    variant="raised"
                    color="primary"
                    onClick={() => {
                        updateLink(this.state)
                        this.closeComposeDialog()
                    }}
                    disabled={!this.canBeSubmitted()}
                >
                    Save
                </Button>
                <IconButton
                    onClick={() => {
                        removeLink(this.state.id)
                        this.closeComposeDialog()
                    }}
                >
                    <Icon>delete</Icon>
                </IconButton>
            </DialogActions>)}
        </Dialog>)
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
                                  addLink            : Actions.addLink,
                                  updateLink         : Actions.updateLink,
                                  removeLink         : Actions.removeLink,
                                  closeNewLinkDialog : Actions.closeNewLinkDialog,
                                  closeEditLinkDialog: Actions.closeEditLinkDialog
                              }, dispatch)
}

function mapStateToProps({profileApp}) {
    const {profile} = profileApp
    return {
        linkDialog: profile.linkDialog,
        profileId : profile.routeParams.id
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(LinkDialog))
