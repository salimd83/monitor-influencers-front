import React, {Component} from 'react'
import {
    Icon,
    IconButton,
    withStyles,
    GridList,
    GridListTile,
    GridListTileBar
}                         from '@material-ui/core'
import SwipeableDrawer    from '@material-ui/core/SwipeableDrawer'

import * as UserActions     from 'auth/store/actions'
import {bindActionCreators} from 'redux'
import {connect}            from 'react-redux'
import {
    FuseUtils,
    FuseAnimateGroup
}                           from '@fuse'
import {Link}               from 'react-router-dom'
import amber                from '@material-ui/core/colors/amber'
import classNames           from 'classnames'
import _                    from 'lodash'

import StarBorderIcon from '@material-ui/icons/StarBorder'

const propTypes = {}

const defaultProps = {}

const styles = theme => (
    {
        fullList       : {
            width: 'auto'
        },
        root           : {
            display        : 'flex',
            flexWrap       : 'wrap',
            justifyContent : 'space-around',
            overflow       : 'hidden',
            backgroundColor: theme.palette.background.paper,
            height         : '25.6vw',
            width          : '100%'
        },
        gridList       : {
            flexWrap : 'nowrap', // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
            transform: 'translateZ(0)'
        },
        gridListTile   : {
            height: '25.6vw'
        },
        gridListTileImg: {
            height: '25.6vw'
        },
        title          : {
            color: theme.palette.primary.light
        },
        titleBar       : {
            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 10%, rgba(0,0,0,0) 100%)'
        }
    }
)


class AppsDrawer extends Component {
    state = {
        top: false
    }

    toggleDrawer = (side, open) => () => {
        this.setState({
            top: open
        })
    }

    componentDidMount() {
        this.flattenNavigation(this.props.navigation)
    }

    flattenNavigation(navigation) {
        this.setState({flatNavigation: FuseUtils.getFlatNavigation(navigation)})
    }

    /**
     render() {
        const {classes, navigation, userRole} = this.props
        let navAppsItem                       = navigation.find(function (element) {
            return element.id === 'apps'
        })

        navAppsItem = navAppsItem.children

        let appsItems = []

        Object.keys(navAppsItem)
              .forEach(function (key) {
                  const item = navAppsItem[key]
                  if (item.auth && userRole.includes(item.auth)) {
                      appsItems.push(item)
                  }
              })


        function ShortcutMenuItem({item, onToggle}) {

            if (item.auth && (!userRole.includes(item.auth) || (userRole !== 'guest' && item.auth.length === 1 && item.auth.includes('guest')))) {
                return null
            }

            return (<Link to={item.url} className={classes.item}>
                <MenuItem key={item.id}>
                    <ListItemIcon>
                        {item.icon ? (<Icon>{item.icon}</Icon>) : (<span className="text-20 font-bold uppercase text-center">{item.title[0]}</span>)}
                    </ListItemIcon>
                    <ListItemText className="pl-0" primary={item.title}/>
                </MenuItem>
            </Link>)
        }


         return (<div className={classNames(classes.root, 'flex flex-1 px-16')}>

         <FuseAnimateGroup
         enter={{
                    animation: 'transition.expandIn'
                }}
         className="md:flex md-flex-1"
         >
         {appsItems.map(item => item && (<Link to={item.url} key={item.id} className={classes.item}>
             <Tooltip title={item.title} placement="bottom">
                 <IconButton className="w-40 h-40">
                     {item.icon ? (<Icon>{item.icon}</Icon>) : (<span className="text-20 font-bold uppercase">{item.title[0]}</span>)}
                 </IconButton>
             </Tooltip>
         </Link>))}
         </FuseAnimateGroup>
         </div>)

    }
     */
    render() {
        const {classes, navigation, userRole} = this.props
        let navAppsItem                       = navigation.find(function (element) {
            return element.id === 'apps'
        })

        navAppsItem = navAppsItem.children

        let appsItems = []

        Object.keys(navAppsItem)
              .forEach(function (key) {
                  const item = navAppsItem[key]
                  if (item.auth && userRole.includes(item.auth)) {
                      appsItems.push({
                          img  : item.image,
                          title: item.title,
                          url  : item.url
                      })
                  }
              })

        if (appsItems.length < 2) {
            return (
                <div></div>
            )
        }

        return (
            <div>
                <IconButton className="w-64 h-64" onClick={this.toggleDrawer('top', true)}>
                    <Icon>apps</Icon>
                </IconButton>
                <SwipeableDrawer
                    anchor="top"
                    open={this.state.top}
                    onClose={this.toggleDrawer('top', false)}
                    onOpen={this.toggleDrawer('top', true)}
                >
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer('top', false)}
                        onKeyDown={this.toggleDrawer('top', false)}
                    >
                        <div className={classes.root}>
                            <GridList className={classes.gridList} cols={2.213} cellHeight={'25.6vw'}>
                                {appsItems.map(tile => (
                                    <GridListTile className={classes.gridListTile} cols={1} key={tile.img}>
                                        <Link to={tile.url}> <img className={classes.gridListTileImg} src={tile.img}
                                                                  alt={tile.title}/></Link>
                                    </GridListTile>
                                ))}
                            </GridList>
                        </div>
                    </div>
                </SwipeableDrawer>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        toggleInShortcuts: UserActions.toggleInShortcuts
    }, dispatch)
}

function mapStateToProps({fuse, auth}) {
    return {
        navigation: fuse.navigation,
        userRole  : auth.user.role
    }
}

AppsDrawer.propTypes    = propTypes
AppsDrawer.defaultProps = defaultProps

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(AppsDrawer))
