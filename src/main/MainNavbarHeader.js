import React        from 'react'
import {withStyles} from '@material-ui/core/styles/index'
import {withRouter} from 'react-router-dom'
import classNames   from 'classnames'
import {Typography} from '@material-ui/core'
import {connect}    from 'react-redux'

const styles = theme => ({
    root    : {
        display   : 'flex',
        alignItems: 'center'
    },
    logo    : {},
    logoIcon: {
        height: 16
    }

})

function MainNavbarHeader({classes, layoutConfig}) {
    console.log('classes', classes, layoutConfig)

    return (<div className={classes.root}>
        <div className={classNames(classes.logo, 'flex items-center')}>
            <img className={classes.logoIcon} src={layoutConfig.logoIcon} id="platformLogo" alt="layoutConfig.logoIconAlt"/>
            <Typography className="text-20 ml-8 font-light logo-text" id="platformName">{layoutConfig.title}</Typography>
            {layoutConfig.subTitle ? (
                <div
                    className="react-badge flex items-center ml-12 py-4 px-8 rounded"
                    style={{
                        backgroundColor: 'rgba(255,255,255,0.6)',
                        color          : '#00000',
                        'border-style' : 'solid',
                        'border-width' : '1px'
                    }}
                >
                    <span className="react-text text-14 ml-4" id="platformSubTitle">{layoutConfig.subTitle}</span>
                </div>) : (<div></div>)}
        </div>
    </div>)
}

function mapStateToProps({fuse}) {
    return {
        layoutConfig: fuse.settings.current
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps)(MainNavbarHeader)))
