import React, {Component} from "react"
import {connect} from "react-redux"
import * as Actions from "auth/store/actions/index"
import {bindActionCreators} from "redux"
import {Link, withRouter} from "react-router-dom"
import {withStyles} from "@material-ui/core/styles/index"
import {Button, Card, CardContent, Divider, Typography} from "@material-ui/core"
import classNames from "classnames"
import {TextFieldFormsy, FuseAnimate} from "@fuse"
import Formsy from "formsy-react"

const styles = theme => ({
	root : {
		background    : "url('/assets/images/backgrounds/dark-material-bg.jpg') no-repeat",
		backgroundSize: "cover"
	},
	intro: {
		color: "#ffffff"
	},
	card : {
		width   : "100%",
		maxWidth: 400
	}
})

class Login extends Component {
	state = {
		canSubmit: false
	}
	
	form = React.createRef()
	
	disableButton = () => {
		this.setState({canSubmit: false})
	}
	
	enableButton = () => {
		this.setState({canSubmit: true})
	}
	
	onSubmit = (model) => {
		this.props.submitLogin(model)
	}
	
	componentDidUpdate (prevProps, prevState) {
		if (this.props.login.error && (this.props.login.error.username || this.props.login.error.password)) {
			this.form.updateInputsWithError({
				                                ...this.props.login.error
			                                })
			
			this.props.login.error = null
			this.disableButton()
		}
		
		if (this.props.user.role !== "guest") {
			const pathname = this.props.location.state && this.props.location.state.redirectUrl ? this.props.location.state.redirectUrl : "/"
			this.props.history.push({
				                        pathname
			                        })
		}
		return null
	}
	
	render () {
		const {classes}   = this.props
		const {canSubmit} = this.state
		
		return (
			<div
				className={classNames(classes.root, "flex flex-col flex-auto flex-no-shrink items-center justify-center p-32")}>
				
				<div className="flex flex-col items-center justify-center w-full">
					
					<FuseAnimate animation="transition.expandIn">
						
						<Card className={classes.card}>
							
							<CardContent className="flex flex-col items-center justify-center p-32">
								
								<img className="w-128 m-32" src="assets/images/logos/fuse.svg" alt="logo"/>
								
								<Typography variant="title" className="mt-16 mb-32">LOGIN TO YOUR ACCOUNT</Typography>
								
								<Formsy
									onValidSubmit={this.onSubmit}
									onValid={this.enableButton}
									onInvalid={this.disableButton}
									onValidNumber={this.enablePasscode}
									ref={(form) => this.form = form}
									className="flex flex-col justify-center w-full"
								>
									<TextFieldFormsy
										className="mb-16"
										type="text"
										name="username"
										label="Phone Number"
										validations={{
											isNumeric: true,
											minLength: 4
										}}
										validationErrors={{
											isNumber: "This doesn't seem to be a valid phone number",
											minLength: "Min character length is 4"
										}}
										required
									/>
									
									<TextFieldFormsy
										className="mb-16"
										type="password"
										name="password"
										label="Password"
										validations={{
											minLength: 4
										}}
										validationErrors={{
											minLength: "The password seems too short"
										}}
										required
									/>
									
									<Button
										type="submit"
										variant="raised"
										color="primary"
										className="w-full mx-auto mt-16 normal-case"
										aria-label="LOG IN"
										disabled={! canSubmit}
										value="legacy"
									>
										Login
									</Button>
								
								</Formsy>
								<Divider className="w-32"/>
								<div className="flex flex-col items-center justify-center pt-32">
									<span className="font-medium">Don't have an account?</span>
									<Link className="font-medium" to="/register">Request an account</Link>
								</div>
							
							
							</CardContent>
						</Card>
					</FuseAnimate>
				</div>
			</div>
		)
	}
}

function mapDispatchToProps (dispatch) {
	return bindActionCreators({
		                          submitLogin      : Actions.submitLogin,
	                          }, dispatch)
}

function mapStateToProps ({auth}) {
	return {
		login: auth.login,
		user : auth.user
	}
}


export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(Login)))