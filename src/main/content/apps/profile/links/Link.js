import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles/index';
import {
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
  CircularProgress
} from '@material-ui/core';
import classNames from 'classnames';
import green from '@material-ui/core/colors/green';
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

const styles = theme => ({
  buttonSuccess: {
    backgroundColor: green[500],
    pointerEvents: 'none'
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1
  }
});

class Link extends Component {
  render() {
    const {
      classes,
      link,
      updatingLink,
      removeLink,
      deletingLink,
      linkDeleted,
      handleClick
    } = this.props;

    const buttonClassname = classNames({
      [classes.buttonSuccess]: linkDeleted
    });

    return (
      <ListItem
        key={link.id}
        style={{
          backgroundColor: updatingLink === link.id ? '#e5e5e5' : '#fff',
          transition: 'all 0.2s'
        }}
      >
        <div className="w-16">
          <i className={`fab fa-${link.type}`} style={{ fontSize: 16 }} />
        </div>
        <ListItemText
          primary={
            <div className="">
              <Typography
                className="font-medium"
                color="primary"
                paragraph={false}
                onClick={handleClick}
                data-title={link.title}
                data-id={link.id}
              >
                {link.title || 'N/A'}
              </Typography>

              <Typography className="inline" paragraph={false}>
                {link.value}
              </Typography>
            </div>
          }
          secondary={link.members}
        />
        <ListItemSecondaryAction>
          <IconButton
            variant="fab"
            color="default"
            mini="true"
            className={buttonClassname}
            onClick={() => {
              removeLink(link.id);
            }}
          >
            {linkDeleted && linkDeleted === link.id ? (
              <CheckIcon />
            ) : (
              <DeleteIcon color="action" />
            )}
          </IconButton>
          {deletingLink &&
            deletingLink === link.id && (
              <CircularProgress size={48} className={classes.fabProgress} />
            )}
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Link);
