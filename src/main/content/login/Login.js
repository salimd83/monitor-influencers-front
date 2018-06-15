import React, {Component} from "react"
import {connect} from "react-redux"
import * as Actions from "auth/store/actions/index"
import {bindActionCreators} from "redux"
import {Link, withRouter} from "react-router-dom"
import {withStyles} from "@material-ui/core/styles/index"
import {Button, Card, CardContent, Divider, Typography} from "@material-ui/core"
import InputAdornment from "@material-ui/core/InputAdornment"

import * as Fn from "fn/index"


import classNames from "classnames"
import {TextFieldFormsy, FuseAnimate} from "@fuse"
import Formsy, {addValidationRule, propTypes, withFormsy} from "formsy-react"

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
		canSubmit: false,
		step     : 1
	}
	
	form = React.createRef()
	
	disableButton = () => {
		this.setState({canSubmit: false})
	}
	
	enableButton = () => {
		this.setState({canSubmit: true})
	}
	
	onSubmitRequest = async (model) => {
		this.disableButton()
		const a = await this.props.submitRequest(model)
		if (a.success) {
			sessionStorage.username = a.username
			this.setState({step: 2})
		}
	}
	
	onForgetUser () {
		delete sessionStorage.username
		this.setState({step: 1})
		
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
	
	nextStep () {
		if (this.refs.form.walk(this.refs.form.childs)) {
			let step = this.state.step
			if (step < 3) {
				step ++
			}
			this.setState({step}, () =>
				this.refs.form.walk(this.refs.form.childs)
			)
		}
	}
	
	renderStep () {
		const {step, canSubmit} = this.state
		let content = null
		const {classes} = this.props
		switch (step) {
			case 1:
				content =
					<Formsy
						onValidSubmit={this.onSubmitRequest}
						onValid={this.enableButton}
						onInvalid={this.disableButton}
						ref={(form) => this.form = form}
						className="flex flex-col justify-center w-full">
						<TextFieldFormsy
							className="mb-16 mt16"
							type="number"
							name="username"
							label="Phone Number"
							value={sessionStorage.username}
							validations={{
								isNumeric: true,
								minLength: 10
							}}
							validationErrors={{
								isNumber : "This doesn't seem to be a valid phone number",
								minLength: "This doesn't look like a valid phone number"
							}}
							required
							InputProps={{
								startAdornment: <InputAdornment position="start">+</InputAdornment>
							}}
						
						/>
						
						<Button
							type="submit"
							variant="raised"
							color="primary"
							className="w-full mx-auto mt-16 normal-case"
							aria-label="Login"
							disabled={! canSubmit}
							value="legacy"
						>
							Get Password
						</Button>
						<div className="flex flex-col items-center justify-center pt-32">
							<span className="font-medium">Don't have an account?</span>
							<Link className="font-medium" to="/register">Request an account</Link>
						</div>
					</Formsy>
				
				break
			case 2:
				content =
					<Formsy
						onValidSubmit={this.onSubmit}
						onValid={this.enableButton}
						onInvalid={this.disableButton}
						ref={(form) => this.form = form}
						className="flex flex-col justify-center w-full"
					>
						<span className="font-small">Please check your mobile for a one time password</span>
						
						<TextFieldFormsy
							className="hidden"
							type="hidden"
							name="username"
							value={sessionStorage.username}
						/>
						
						<TextFieldFormsy
							className="mb-16 mt-16"
							type="text"
							name="password"
							label="Passcode"
							validations={{
								minLength: 2
							}}
							validationErrors={{
								minLength: "Passcode is too short."
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
						<div className="flex flex-col items-center justify-center pt-32">
							<span className="font-medium">Didn't get a text?</span>
							<Link className="font-small" to="/login?retry">Change Number or Try Again</Link>
						</div>
					</Formsy>
				break
		}
		return content
	}
	
	render () {
		const {classes} = this.props
		const {step, canSubmit} = this.state
		
		
		return (
			<div
				className={classNames(classes.root, "flex flex-col flex-auto flex-no-shrink items-center justify-center p-32")}>
				
				<div className="flex flex-col items-center justify-center w-full">
					
					<FuseAnimate animation="transition.expandIn">
						
						<Card className={classes.card}>
							
							<CardContent className="flex flex-col items-center justify-center p-32">
								
								<img className="w-128 m-32" src="assets/images/logos/fuse.svg" alt="logo"/>
								
								<Typography variant="title" className="mt-16 mb-16">LOGIN TO YOUR ACCOUNT</Typography>
								{this.renderStep(step)}
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
		                          submitLogin  : Actions.submitLogin,
		                          submitRequest: Actions.submitRequest
	                          }, dispatch)
}

function mapStateToProps ({auth}) {
	return {
		login: auth.login,
		user : auth.user
	}
}


export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(Login)))