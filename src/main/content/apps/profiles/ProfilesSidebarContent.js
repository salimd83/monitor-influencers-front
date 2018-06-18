import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles/index';
import {
  Avatar,
  Divider,
  Icon,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography
} from '@material-ui/core';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { NavLink, withRouter } from 'react-router-dom';
import { FuseAnimate } from '@fuse';

const styles = theme => ({
  root: {},
  listItem: {
    color: 'inherit!important',
    textDecoration: 'none!important',
    '&.active': {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText + '!important',
      pointerEvents: 'none',
      '& .list-item-icon': {
        color: 'inherit'
      }
    }
  }
});

class ProfilesSidebarContent extends Component {
  render() {
    const { classes, user } = this.props;
    return (
      <div className={classNames(classes.root, 'lg:p-24 lg:pr-4')}>
        <FuseAnimate animation="transition.slideLeftIn" delay={200}>
          <Paper>
            <div className="p-24 flex items-center">
              <Avatar className="mr-12" alt={user.name} src={user.avatar} />
              <Typography>{user.name}</Typography>
            </div>
            <Divider />
            <List>
              <ListItem
                button
                component={NavLink}
                to={'/apps/profiles/all'}
                activeClassName="active"
                className={classes.listItem}
              >
                <Icon className="list-item-icon text-16" color="action">
                  people
                </Icon>
                <ListItemText primary="All profiles" disableTypography={true} />
              </ListItem>
              <ListItem
                button
                component={NavLink}
                to={'/apps/profiles/frequent'}
                activeClassName="active"
                className={classes.listItem}
              >
                <Icon className="list-item-icon text-16" color="action">
                  restore
                </Icon>
                <ListItemText
                  primary="Frequently Viewd"
                  disableTypography={true}
                />
              </ListItem>
              <ListItem
                button
                component={NavLink}
                to={'/apps/profiless/starred'}
                activeClassName="active"
                className={classes.listItem}
              >
                <Icon className="list-item-icon text-16" color="action">
                  star
                </Icon>
                <ListItemText
                  primary="Starred profiles"
                  disableTypography={true}
                />
              </ListItem>
            </List>
          </Paper>
        </FuseAnimate>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

function mapStateToProps({ profilesApp }) {
  return {
    user: profilesApp.user
  };
}

export default withStyles(styles, { withTheme: true })(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(ProfilesSidebarContent)
  )
);
