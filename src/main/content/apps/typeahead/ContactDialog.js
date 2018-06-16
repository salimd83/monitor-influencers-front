import React, {Component} from "react"
import {
	TextField,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	FormControl,
	InputLabel,
	Input,
	Icon,
	IconButton,
	Typography,
	Toolbar,
	AppBar,
	Avatar
} from "@material-ui/core"
import {withStyles} from "@material-ui/core/styles/index"
import {bindActionCreators} from "redux"
import * as Actions from "./store/actions"
import {connect} from "react-redux"
import _ from "lodash"

const styles          = theme => ({
	root       : {},
	formControl: {
		marginBottom: 24
	}
})
const newContactState = {
	id        : "",
	name      : "",
	type      : "",
	created_at: "",
	notes     : ""
}

class ContactDialog extends Component {
	state = {...newContactState}
	handleChange = (event) => {
		this.setState(_.set({...this.state}, event.target.name, event.target.type === "checkbox" ? event.target.checked : event.target.value))
	}
	closeComposeDialog = () => {
		this.props.contactDialog.type === "edit" ? this.props.closeEditContactDialog() : this.props.closeNewContactDialog()
	}
	
	componentDidUpdate (prevProps, prevState, snapshot) {
		/**
		 * After Dialog Open
		 */
		if (! prevProps.contactDialog.props.open && this.props.contactDialog.props.open) {
			/**
			 * Dialog type: 'edit'
			 * Update State
			 */
			if (this.props.contactDialog.type === "edit" &&
				this.props.contactDialog.data &&
				! _.isEqual(this.props.contactDialog.data, prevState)) {
				this.setState({...this.props.contactDialog.data})
			}
			
			/**
			 * Dialog type: 'new'
			 * Update State
			 */
			if (this.props.contactDialog.type === "new" &&
				! _.isEqual(newContactState, prevState)) {
				this.setState({...newContactState})
			}
		}
	}
	
	canBeSubmitted () {
		const {name} = this.state
		return (
			name.length > 0
		)
	}
	
	render () {
		const {classes, contactDialog, addContact, updateContact, removeContact} = this.props
		
		return (
			<Dialog className={classes.root} {...contactDialog.props} onClose={this.closeComposeDialog} fullWidth
			        maxWidth="xs">
				
				<AppBar position="static">
					<Toolbar className="flex w-full">
						<Typography variant="subheading" color="inherit">
							{contactDialog.type === "new" ? "New Typeahead" : "Edit Typeahead"}
						</Typography>
					</Toolbar>
					<div className="flex flex-col items-center justify-center pb-24">
						{contactDialog.type === "edit" && (
							<Typography variant="title" color="inherit" className="pt-8">
								{this.state.name}
							</Typography>
						)}
					</div>
				</AppBar>
				
				<DialogContent classes={{root: "p-24"}}>
					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">account_circle</Icon>
						</div>
						<FormControl className={classes.formControl} required fullWidth>
							<InputLabel htmlFor="name">Name</InputLabel>
							<Input autoFocus id="name" name="name" value={this.state.name}
							       onChange={this.handleChange}/>
						</FormControl>
					</div>
					
					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">home</Icon>
						</div>
						<FormControl className={classes.formControl} fullWidth>
							<InputLabel htmlFor="type">Type</InputLabel>
							<Input id="type" value={this.state.type} onChange={this.handleChange}/>
						</FormControl>
					</div>
					
					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">note</Icon>
						</div>
						<TextField
							className={classes.formControl}
							id="notes"
							label="Notes"
							type="text"
							value={this.state.notes}
							multiline rows={5} fullWidth
						/>
					</div>
				</DialogContent>
				
				{contactDialog.type === "new" ? (
					<DialogActions className="justify-between pl-16">
						<Button
							variant="raised"
							color="primary"
							onClick={() => {
								addContact(this.state)
								this.closeComposeDialog()
							}}
							disabled={! this.canBeSubmitted()}
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
								updateContact(this.state)
								this.closeComposeDialog()
							}}
							disabled={! this.canBeSubmitted()}
						>
							Save
						</Button>
						<IconButton
							onClick={() => {
								removeContact(this.state.id)
								this.closeComposeDialog()
							}}
						>
							<Icon>delete</Icon>
						</IconButton>
					</DialogActions>
				)}
			</Dialog>
		)
	}
}


function mapDispatchToProps (dispatch) {
	return bindActionCreators({
		                          closeEditContactDialog: Actions.closeEditContactDialog,
		                          closeNewContactDialog : Actions.closeNewContactDialog,
		                          addContact            : Actions.addContact,
		                          updateContact         : Actions.updateContact,
		                          removeContact         : Actions.removeContact
	                          }, dispatch)
}

function mapStateToProps ({contactsApp}) {
	return {
		contactDialog: contactsApp.contacts.contactDialog
	}
}


export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(ContactDialog))