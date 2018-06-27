import React, {Component} from 'react'
import {
    FusePageCarded,
    FuseAnimate
}                         from '@fuse'
import {withStyles}       from '@material-ui/core/styles'

import InsightHeader from './InsightHeader'
import InsightGrid   from './InsightGrid'

class InsightApp extends Component {
    render() {
        const {classes} = this.props
        return (<FusePageCarded
            className={classes.root}
            classes={{
                root: classes.layoutRoot
                // contentCardWrapper: classes.layoutContentCardWrapper
            }}
            header={<InsightHeader pageLayout={() => this.pageLayout}/>}
            content={<InsightGrid/>}
            sidebarInner
            onRef={instance => {
                this.pageLayout = instance
            }}
        />)
    }
}

const headerHeight = 160

const styles = theme => ({
    root                    : {},
    layoutHeader            : {
        height   : headerHeight,
        minHeight: headerHeight
    },
    layoutContentCardWrapper: {
        padding      : 24,
        paddingBottom: 80
    }
})

export default withStyles(styles, {withTheme: true})(InsightApp)
