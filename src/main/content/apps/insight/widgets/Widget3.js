import React, {Component}   from 'react'
import {connect}            from 'react-redux'
import {
    Card,
    Icon,
    Typography
}                           from '@material-ui/core'
import {Line}               from 'react-chartjs-2'
import {bindActionCreators} from 'redux'
import {withStyles}         from '@material-ui/core/styles/index'
import classNames           from 'classnames'
import Popover              from '@material-ui/core/Popover'

const styles = theme => ({
    root      : {},
    typography: {
        margin  : theme.spacing.unit,
        fontSize: '14px'
    }
})

class Widget3 extends Component {
    state = {
        anchorEl: null
    }

    handleClick = event => {
        this.setState({
                          anchorEl: event.currentTarget
                      })
    }

    handleClose = () => {
        this.setState({
                          anchorEl: null
                      })
    }

    render() {
        const {data, classes, theme, popovertext} = this.props
        const dataWithColors                      = data.datasets.map(obj => ({
            ...obj,
            borderColor: theme.palette.secondary.main
        }))
        const {anchorEl}                          = this.state
        return (<Card className={classNames(classes.root, 'w-full', 'h-full')}>
            <div className="p-16 pb-0 flex flex-row items-end flex-wrap">
                <div className="pr-16">
                    <Typography className="h3" color="textSecondary">
                        Impressions
                    </Typography>
                    <Typography className="text-56 font-300 leading-none mt-8">
                        {data.impressions.value}
                    </Typography>
                </div>

                <div className="py-4 text-16 flex flex-row items-center">
                    <div className="flex flex-row items-center">
                        {data.impressions.ofTarget > 0 && (<Icon className="text-green mr-4">trending_up</Icon>)}
                        {data.impressions.ofTarget < 0 && (<Icon className="text-red mr-4">trending_down</Icon>)}
                        <Typography>{data.impressions.ofTarget}%</Typography>
                    </div>
                    <Typography className="ml-4 whitespace-no-wrap">
                        of target
                    </Typography>
                </div>
            </div>

            <div className="h-96 w-100-p" style={{height: 105}}>
                <Line
                    data={{
                        labels  : data.labels,
                        datasets: dataWithColors
                    }}
                    options={data.options}
                />
            </div>
            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={this.handleClose}
                anchorOrigin={{
                    vertical  : 'bottom',
                    horizontal: 'left'
                }}
                transformOrigin={{
                    vertical  : 'top',
                    horizontal: 'left'
                }}
            >
                <Typography className={classes.typography}>{popovertext}</Typography>
            </Popover>
        </Card>)
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch)
}

function mapStateToProps({analyticsDashboardApp}) {
    return {
        widgets: analyticsDashboardApp.widgets.data
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(Widget3))
