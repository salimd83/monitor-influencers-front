import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles/index';
import axios from 'axios/index';
import {
  AppBar,
  Button,
  Card,
  CardContent,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Toolbar,
  Typography,
  FormControl,
  Input,
  CircularProgress
} from '@material-ui/core';
import classNames from 'classnames';
import { FuseAnimateGroup } from '@fuse';
import LinkDialog from '../LinkDialog';
import Popover from '@material-ui/core/Popover';
import _ from 'lodash';
import green from '@material-ui/core/colors/green';
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../store/actions';

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

class AboutTab extends Component {
  state = {
    anchorEl: null,
    title: '',
    id: ''
  };

  componentDidMount() {
    axios.get('/api/profile/about').then(res => {
      this.setState(res.data);
    });
  }

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget,
      title: event.currentTarget.dataset.title,
      id: event.currentTarget.dataset.id
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
      profile,
      links,
      openNewLinkDialog,
      removeLink,
      updateLink,
      deletingLink,
      linkDeleted,
      updatingLink
    } = this.props;

    const buttonClassname = classNames({
      [classes.buttonSuccess]: linkDeleted
    });

    const { anchorEl, title, id } = this.state;

    return (
      <div className={classNames(classes.root, 'md:flex max-w-2xl')}>
        <div className="flex flex-col flex-1 md:pr-32">
          <FuseAnimateGroup
            enter={{
              animation: 'transition.slideUpBigIn'
            }}
          >
            {profile && (
              <Card className="w-full mb-16">
                <AppBar position="static" elevation={0}>
                  <Toolbar className="pl-16 pr-8">
                    <Typography
                      variant="subheading"
                      color="inherit"
                      className="flex-1"
                    >
                      General Information
                    </Typography>
                  </Toolbar>
                </AppBar>

                <CardContent>
                  <div className="mb-24">
                    <Typography className="font-bold mb-4 text-15">
                      Description
                    </Typography>
                    <Typography>{profile.description}</Typography>
                  </div>

                  <div className="mb-24">
                    <Typography className="font-bold mb-4 text-15">
                      Category
                    </Typography>
                    <Typography>{profile.category.name}</Typography>
                  </div>

                  <div className="mb-24">
                    <Typography className="font-bold mb-4 text-15">
                      Country
                    </Typography>
                    <Typography>{profile.country}</Typography>
                  </div>

                  {/* <div className="mb-24">
                                        <Typography className="font-bold mb-4 text-15">Country</Typography>

                                        {general.locations.map((location) => (
                                            <div className="flex items-center" key={location}>
                                                <Typography>{location}</Typography>
                                                <Icon className="text-16 ml-4" color="action">location_on</Icon>
                                            </div>
                                        ))}
                                    </div> */}

                  <div className="mb-24">
                    <Typography className="font-bold mb-4 text-15">
                      Description
                    </Typography>
                    <Typography>{profile.description}</Typography>
                  </div>
                </CardContent>
              </Card>
            )}

            {profile && (
              <Card className="w-full mb-16">
                <AppBar position="static" elevation={0}>
                  <Toolbar className="pl-16 pr-8">
                    <Typography
                      variant="subheading"
                      color="inherit"
                      className="flex-1"
                    >
                      Work
                    </Typography>
                  </Toolbar>
                </AppBar>

                <CardContent>
                  <div className="mb-24">
                    <Typography className="font-bold mb-4 text-15">
                      Industry
                    </Typography>
                    <Typography>{profile.industry.name}</Typography>
                  </div>
                </CardContent>
              </Card>
            )}
          </FuseAnimateGroup>
        </div>

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
                      <ListItem
                        key={link.id}
                        style={{
                          backgroundColor:
                            updatingLink === link.id ? '#e5e5e5' : '#fff',
                          transition: 'all 0.2s'
                        }}
                      >
                        <div className="w-16">
                          <i
                            className={`fab fa-${link.type}`}
                            style={{ fontSize: 16 }}
                          />
                        </div>
                        <ListItemText
                          primary={
                            <div className="">
                              <Typography
                                className="font-medium"
                                color="primary"
                                paragraph={false}
                                onClick={this.handleClick}
                                data-title={link.title}
                                data-id={link.id}
                              >
                                {link.title || 'N/A'}
                              </Typography>

                              <Typography
                                className="inline ml-4"
                                paragraph={false}
                              >
                                {link.value}
                              </Typography>
                            </div>
                          }
                          secondary={link.members}
                        />
                        <ListItemSecondaryAction>
                          <IconButton
                            variant="fab"
                            color="#fff"
                            mini
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
                              <CircularProgress
                                size={48}
                                className={classes.fabProgress}
                              />
                            )}
                          {/* <IconButton
                            onClick={() => {
                              removeLink(link.id);
                            }}
                          >
                            <Icon>delete</Icon>
                          </IconButton> */}
                        </ListItemSecondaryAction>
                      </ListItem>
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
      </div>
    );
  }
}

function mapDispatchToProdps(dispatch) {
  return bindActionCreators(
    {
      openNewLinkDialog: Actions.openNewLinkDialog,
      removeLink: Actions.removeLink,
      updateLink: Actions.updateLink
    },
    dispatch
  );
}

function mapStateToProps({ profileApp }) {
  const { deletingLink, LinkDeleted, updatingLink } = profileApp.profile;
  return { deletingLink, LinkDeleted, updatingLink };
}

export default withStyles(styles, { withTheme: true })(
  connect(
    mapStateToProps,
    mapDispatchToProdps
  )(AboutTab)
);
