import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles/index';
import {
  AppBar,
  Button,
  Card,
  CardContent,
  Icon,
  List,
  Toolbar,
  Typography,
  FormControl,
  Input
} from '@material-ui/core';
import { FuseAnimateGroup } from '@fuse';
import Popover from '@material-ui/core/Popover';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import * as Actions from '../store/actions';
import LinkDialog from './LinkDialog';
import Link from './Link';

const styles = theme => ({});

class Links extends Component {
  state = {
    anchorEl: null,
    title: '',
    id: ''
  };

  handleClick = event => {
    const { currentTarget } = event;
    this.setState({
      anchorEl: currentTarget,
      title: currentTarget.dataset.title,
      id: currentTarget.dataset.id
    });
  };

  handleChange = event => {
    this.setState(
      _.set(
        { ...this.state },
        event.target.name,
        event.target.type === 'checkbox'
          ? event.target.checked
          : event.target.value
      )
    );
  };

  handleClose = () => {
    this.setState({
      anchorEl: null
    });
  };

  render() {
    const {
      classes,
      links,
      openNewLinkDialog,
      removeLink,
      updateLink,
      deletingLink,
      linkDeleted,
      updatingLink
    } = this.props;

    const { handleClick } = this;

    const { anchorEl, title, id } = this.state;

    return (
      <div className="flex flex-col md:w-320">
        <FuseAnimateGroup
          enter={{
            animation: 'transition.slideUpBigIn'
          }}
        >
          <Card className="w-full mb-16">
            <AppBar position="static" elevation={0}>
              <Toolbar className="pl-16 pr-8">
                <Typography
                  variant="subheading"
                  color="inherit"
                  className="flex-1"
                >
                  Links
                </Typography>
                <Button
                  className="normal-case"
                  color="inherit"
                  size="small"
                  onClick={openNewLinkDialog}
                >
                  <Icon>add</Icon>
                </Button>
              </Toolbar>
            </AppBar>
            <CardContent className="p-0">
              <List className="p-0">
                {links &&
                  links.map(link => (
                    <Link
                      key={link.id}
                      {...{
                        link,
                        linkDeleted,
                        updatingLink,
                        removeLink,
                        deletingLink,
                        handleClick
                      }}
                    />
                  ))}
                <Popover
                  open={Boolean(anchorEl)}
                  anchorEl={anchorEl}
                  onClose={this.handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                  }}
                >
                  <FormControl className={classes.formControl} required>
                    <Input
                      style={{ padding: '4px 10px' }}
                      autoFocus
                      id="title"
                      name="title"
                      value={this.state.title}
                      onChange={this.handleChange}
                      onKeyPress={e => {
                        if (e.key == 'Enter') {
                          updateLink({ title, id });
                          this.handleClose();
                        }
                      }}
                    />
                  </FormControl>
                </Popover>
              </List>
            </CardContent>
          </Card>
        </FuseAnimateGroup>
        <LinkDialog />
      </div>
    );
  }
}

function mapDispatchToProdps(dispatch) {
  return bindActionCreators(
    {
      openNewLinkDialog: Actions.openNewLinkDialog,
      removeLink: Actions.removeLink,
      updateLink: Actions.updateLink,
      addTag: Actions.addTag
    },
    dispatch
  );
}

function mapStateToProps({ profileApp }) {
  const { deletingLink, LinkDeleted, updatingLink, links } = profileApp.profile;
  return { deletingLink, LinkDeleted, updatingLink, links };
}

export default withStyles(styles, { withTheme: true })(
  connect(
    mapStateToProps,
    mapDispatchToProdps
  )(Links)
);
