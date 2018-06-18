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
  Typography
} from '@material-ui/core';
import classNames from 'classnames';
import { FuseAnimateGroup } from '@fuse';
import LinkDialog from '../LinkDialog';

const styles = theme => ({
  root: {}
});

class AboutTab extends Component {
  state = {
    general: null,
    work: null,
    contact: null,
    groups: null,
    friends: null
  };

  componentDidMount() {
    axios.get('/api/profile/about').then(res => {
      this.setState(res.data);
    });
  }

  render() {
    const { classes, profile, links, openNewLinkDialog } = this.props;
    const { general, work, contact, groups, friends } = this.state;

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

                  {/* <div className="mb-24">
                    <Typography className="font-bold mb-4 text-15">
                      Jobs
                    </Typography>
                    <table className="">
                      <tbody>
                        {work.jobs.map(job => (
                          <tr key={job.company}>
                            <td className="pr-16">
                              <Typography>{job.company}</Typography>
                            </td>
                            <td>
                              <Typography color="textSecondary">
                                {job.date}
                              </Typography>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div> */}
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
            {/* <Card className="w-full mb-16">
              <AppBar position="static" elevation={0}>
                <Toolbar className="pl-16 pr-8">
                  <Typography
                    variant="subheading"
                    color="inherit"
                    className="flex-1"
                  >
                    Friends
                  </Typography>
                  <Button className="normal-case" color="inherit" size="small">
                    See 454 more
                  </Button>
                </Toolbar>
              </AppBar>
              <CardContent className="p-0">
                <List className="p-8">
                  {friends &&
                    friends.map(friend => (
                      <img
                        key={friend.id}
                        className="w-64 m-4"
                        src={friend.avatar}
                        alt={friend.name}
                      />
                    ))}
                </List>
              </CardContent>
            </Card> */}

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
                      <ListItem key={link.id}>
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
                              >
                                {link.title}
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
                          <IconButton>
                            <Icon>delete</Icon>
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
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

export default withStyles(styles, { withTheme: true })(AboutTab);
