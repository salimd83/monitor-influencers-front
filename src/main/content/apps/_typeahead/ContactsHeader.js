import React, {Component} from "react"
import {withStyles} from "@material-ui/core/styles/index"
import {Hidden, Icon, IconButton, TextField, Typography} from "@material-ui/core"
import * as Actions from "./store/actions"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import classNames from "classnames"
import {FuseAnimate} from "@fuse"
import MenuItem from "@material-ui/core/MenuItem"
import Select from "@material-ui/core/Select"
import InputLabel from "@material-ui/core/InputLabel"
import FormControl from "@material-ui/core/FormControl"


const styles = theme => ({
	root: {}
})

class ContactsHeader extends Component {
	
	render () {
		const {classes, setSearchText, searchText, searchType, setSearchType, pageLayout} = this.props
		return (
			<div
				className={classNames(classes.root, "flex flex-1 flex-col sm:flex-row items-center justify-between p-24")}>
				
				<div className="flex flex-1 items-center">
					
					<div className="flex items-center">
						<FuseAnimate animation="transition.expandIn" delay={300}>
							<Icon className="text-32 mr-12">account_box</Icon>
						</FuseAnimate>
						<FuseAnimate animation="transition.slideLeftIn" delay={300}>
							<Typography variant="title">Typeahead</Typography>
						</FuseAnimate>
					</div>
				</div>
				
				<div className="flex items-center">
					
					<FuseAnimate animation="transition.expandIn" delay={300}>
						<Icon color="action">search</Icon>
					</FuseAnimate>
					
					<FuseAnimate animation="transition.slideLeftIn" delay={300}>
						<FormControl className={classes.container} noValidate autoComplete="off"
						             onChange={setSearchText}>
							<InputLabel htmlFor="query-type">Type</InputLabel>
							<Select
								value={searchType}
								inputProps={{
									name: "Type",
									id  : "query-type"
								}}
							>
								<MenuItem value=''>
									<em>All</em>
								</MenuItem>
								<MenuItem value={'brand'}>Brand</MenuItem>
								<MenuItem value={'location'}>Location</MenuItem>
								<MenuItem value={'hashtag'}>Hashtag</MenuItem>
							</Select>
							<TextField
								placeholder="Search Name"
								className="pl-12"
                                onChange={setSearchText}
								inputProps={{
									"aria-label": "Search"
								}}
							/>
						</FormControl>
					</FuseAnimate>
				</div>
			</div>
		)
		
	}
}

function mapDispatchToProps (dispatch) {
	return bindActionCreators({
		                          setSearchText: Actions.setSearchText
	                          }, dispatch)
}

function mapStateToProps ({contactsApp}) {
	return {
		searchText: contactsApp.contacts.searchText,
		searchType: contactsApp.contacts.searchType
		
	}
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(ContactsHeader))
