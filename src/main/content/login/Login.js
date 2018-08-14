import React, {Component}   from 'react'
import {connect}            from 'react-redux'
import * as Actions         from 'auth/store/actions/index'
import {bindActionCreators} from 'redux'
import {
    Link,
    withRouter
}                           from 'react-router-dom'
import {withStyles}         from '@material-ui/core/styles/index'
import {
    Button,
    Card,
    CardContent,
    Typography
}                           from '@material-ui/core'
import InputAdornment       from '@material-ui/core/InputAdornment'

import classNames from 'classnames'
import {
    TextFieldFormsy,
    FuseAnimate
}                 from '@fuse'
import Formsy     from 'formsy-react'

import {simpleStore} from 'fn'

const styles = theme => (
    {
        root : {
            background    : 'url(\'https://secure.aadcdn.microsoftonline-p.com/c1c6b6c8-ogpfrapdxzkqbtgla7whfe5enpck3dusb7h-rcuk018/logintenantbranding/0/illustration\') no-repeat',
            backgroundSize: 'cover'
        },
        intro: {
            color: '#ffffff'
        },
        card : {
            width   : '100%',
            maxWidth: 400
        }
    }
)

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

    onSubmitRequest = async model => {
        this.disableButton()
        const a = await this.props.submitRequest(model)
        if (a.success) {
            simpleStore.upsert('hiUsername', a.username, 'local')
            this.setState({step: 2})
        }
    }

    onSubmit = model => {
        this.disableButton()
        this.props.submitLogin(model)
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.login.error && (
            this.props.login.error.username || this.props.login.error.password
        )) {
            this.form.updateInputsWithError({
                ...this.props.login.error
            })

            this.props.login.error = null
            this.disableButton()
        }

        if (!this.props.user.role.includes('guest')) {
            const pathname = this.props.location.state && this.props.location.state.redirectUrl
                             ? this.props.location.state.redirectUrl : '/'
            this.props.history.push({
                pathname
            })
        }
        return null
    }

    nextStep() {
        if (this.refs.form.walk(this.refs.form.childs)) {
            let step = this.state.step
            if (step < 3) {
                step++
            }
            this.setState({step}, () => this.refs.form.walk(this.refs.form.childs))
        }
    }

    renderStep() {
        const {step, canSubmit} = this.state
        let content             = null
        const {classes}         = this.props
        let username            = simpleStore.lookup('hiUsername', 'local')
        switch (step) {
            case 1:
                content = (

                    <Formsy
                        onValidSubmit={this.onSubmitRequest}
                        onValid={this.enableButton}
                        onInvalid={this.disableButton}
                        ref={form => (
                            this.form = form
                        )}
                        className="flex flex-col justify-center w-full">
                        <Typography variant="title" className="mt-16 mb-16">
                            Sign in
                        </Typography>
                        <TextFieldFormsy
                            className="mb-16 mt16"
                            type="number"
                            name="username"
                            label="Phone Number"
                            value={username}
                            validations={{
                                isNumeric: true
                            }}
                            validationErrors={{
                                isNumber: 'This doesn\'t seem to be a valid phone number'
                            }}
                            required
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">+</InputAdornment>
                                )
                            }}
                        />

                        <Button
                            type="submit"
                            variant="raised"
                            color="primary"
                            className="mx-auto mt-16 normal-case float-right"
                            style={{marginRight: 0}}
                            aria-label="Login"
                            disabled={!canSubmit}
                            value="legacy"
                        >
                            Next
                        </Button>
                        <div className="flex flex-col items-center justify-center pt-32">

                        </div>
                    </Formsy>
                )

                break
            case 2:
                content = (

                    <Formsy
                        onValidSubmit={this.onSubmit}
                        onValid={this.enableButton}
                        onInvalid={this.disableButton}
                        ref={form => (
                            this.form = form
                        )}
                        className="flex flex-col justify-center w-full"
                    >
                        <Typography variant="title" className="mt-16 mb-16">
                            Enter passcode
                        </Typography>

                        <TextFieldFormsy
                            className="hidden"
                            type="hidden"
                            name="username"
                            value={username}
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
                                minLength: 'Passcode is too short.'
                            }}
                            required
                        />
                        <span className="font-small">
              Please check your mobile for a one time password
            </span>
                        <Button
                            type="submit"
                            variant="raised"
                            color="primary"
                            className=" mx-auto mt-16 normal-case"
                            style={{marginRight: 0}}
                            aria-label="Sign In"
                            disabled={!canSubmit}
                            value="legacy"
                        >
                            Sign in
                        </Button>
                        <div className="flex flex-col items-center justify-center pt-32">
                            <span className="font-medium">Didn't get a text?</span>
                            <Link className="font-small" to="/">
                                Change Number or Try Again
                            </Link>
                        </div>
                    </Formsy>
                )
                break
        }
        return content
    }

    render() {
        const {classes} = this.props
        const {step}    = this.state

        return (
            <div
                className={classNames(classes.root, 'flex flex-col flex-auto flex-no-shrink items-center justify-center p-32')}
            >
                <div className="flex flex-col items-center justify-center w-full">
                    <FuseAnimate animation="transition.expandIn">
                        <Card className={classes.card}>
                            <CardContent className="flex flex-col items-center justify-center p-32">
                                <img
                                    className="w-96 m-32"
                                    src="assets/images/logos/fuse.svg"
                                    alt="logo"
                                />
                                {this.renderStep(step)}
                            </CardContent>
                        </Card>
                    </FuseAnimate>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        submitLogin  : Actions.submitLogin,
        submitRequest: Actions.submitRequest
    }, dispatch)
}

function mapStateToProps({auth}) {
    return {
        login: auth.login,
        user : auth.user
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(Login)))
