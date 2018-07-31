import React, {Component}   from 'react'
import {connect}            from 'react-redux'
import {Redirect}           from 'react-router-dom'
import * as Actions         from 'auth/store/actions/index'
import {getUserData}        from 'auth/store/actions'
import {bindActionCreators} from 'redux'
import {
    Link,
    withRouter
}                           from 'react-router-dom'
import {withStyles}         from '@material-ui/core/styles/index'
import {
    Input,
    Paper,
    Icon,
    Typography
}                           from '@material-ui/core'
import InputAdornment       from '@material-ui/core/InputAdornment'
import {simpleStore}        from 'fn'

import classNames from 'classnames'
import {
    TextFieldFormsy,
    FuseAnimate
}                 from '@fuse'

const styles = theme => ({
    root         : {},
    searchWrapper: {
        width     : '100%',
        height    : 56,
        padding   : 18,
        display   : 'flex',
        alignItems: 'center'
    },
    search       : {
        paddingLeft: 16
    }
})


class IndexComp extends Component {
    state = {
        user: this.props.user
    }


    render() {
        const {classes, user} = this.props
        return (<div className={classNames(classes.root, 'flex flex-col flex-1 items-center justify-center p-16')}>
            component: () => <Redirect to={user.landingPage}/>
            <div className="max-w-512 text-center">

                <FuseAnimate animation="transition.expandIn" delay={100}>
                    <Typography variant="display4" color="inherit" className="font-medium mb-16">
                        Hold Tight
                    </Typography>
                </FuseAnimate>

                <FuseAnimate delay={500}>
                    <Typography variant="headline" color="textSecondary" className="mb-16">
                        We are heading to your default landing page.
                    </Typography>
                </FuseAnimate>
            </div>
        </div>)
    }

}

function mapStateToProps({auth}) {
    return {
        login: auth.login,
        user : auth.user
    }
}


export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps)(IndexComp)))