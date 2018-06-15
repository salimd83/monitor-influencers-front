import React from 'react';
import {withStyles} from '@material-ui/core/styles/index';
import {withRouter} from 'react-router-dom';
import classNames from 'classnames';
import {Typography} from '@material-ui/core';

const styles = theme => ({
    root    : {
        display   : 'flex',
        alignItems: 'center'
    },
    logo    : {},
    logoIcon: {
        width : 38,
        height: 38
    },
    
});

function MainNavbarHeader({classes})
{
    return (
        <div className={classes.root}>
            <div className={classNames(classes.logo, "flex items-center")}>
                <img className={classes.logoIcon} src="assets/images/logos/fuse.svg" alt="logo"/>
                <Typography className="text-20 ml-8 font-light logo-text">MIRROR</Typography>
                <div
                    className="react-badge flex items-center ml-12 py-4 px-8 rounded"
                    style={{
                        backgroundColor: 'rgba(0,0,0,0.6)',
                        color          : '#61dafb'
                    }}
                >
                    <span className="react-text text-14 ml-4">ARA</span>
                </div>
            </div>
        </div>
    );
};

export default withStyles(styles, {withTheme: true})(withRouter(MainNavbarHeader));
