import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles/index';
import {
  AppBar,
  Card,
  CardContent,
  Toolbar,
  Typography,
  Chip
} from '@material-ui/core';
import classNames from 'classnames';
import { FuseAnimateGroup } from '@fuse';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Async } from 'react-select';
import 'react-select/dist/react-select.css';

import * as Fn from 'fn/simpleCall.js';
import * as Actions from '../store/actions';
import Links from '../links/Links';

const styles = theme => ({});

class AboutTab extends Component {
  getTagsOptions = (input, callback) => {
    const request = Fn.simpleCall('get', `typeahead/all?q=${input}`);
    console.log('getTags');
    request.then(response => {
      const names = this.props.tags.map(tag => tag.name);
      const filteredTags = response.data.filter(
        tag => !names.includes(tag.name)
      );

      callback(null, {
        options: filteredTags.map(tag => ({
          label: `${tag.type}/${tag.name}`,
          value: tag.name,
          name: tag.name,
          type: tag.type,
          id: tag.id
        })),
        complete: true
      });
    });
  };

  handleAsyncSelectChange = selectedOption => {
    const { addTag, profile } = this.props;
    addTag(selectedOption, profile.id);
  };

  handleTagDelete = tag => {
    this.props.deleteTag(tag.id);
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

  render() {
    const { classes, profile, tags } = this.props;

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

                  <div className="mb-24">
                    <Typography className="font-bold mb-4 text-15">
                      Industry
                    </Typography>
                    <Typography>{profile.industry.name}</Typography>
                  </div>

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
              <Card className="w-full mb-16" style={{ overflow: 'initial' }}>
                <AppBar position="static" elevation={0}>
                  <Toolbar className="pl-16 pr-8">
                    <Typography
                      variant="subheading"
                      color="inherit"
                      className="flex-1"
                    >
                      Tags
                    </Typography>
                  </Toolbar>
                </AppBar>

                <CardContent>
                  <div className="mb-24">
                    <div className="mb-24">
                      {!tags.length && (
                        <Typography className="mb-4 text-15">
                          No tags.
                        </Typography>
                      )}
                      {tags.length !== 0 &&
                        tags.map(tag => (
                          <Chip
                            key={tag.id}
                            id={tag.id}
                            label={tag.name}
                            onDelete={() => this.handleTagDelete(tag)}
                            className={classes.chip + ' m-4'}
                          />
                        ))}
                    </div>

                    <Async
                      name="profile-tags"
                      onChange={this.handleAsyncSelectChange}
                      loadOptions={this.getTagsOptions}
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </FuseAnimateGroup>
        </div>

        {/* Links Section */}
        <Links />
      </div>
    );
  }
}

function mapDispatchToProdps(dispatch) {
  return bindActionCreators(
    { addTag: Actions.addTag, deleteTag: Actions.deleteTag },
    dispatch
  );
}

function mapStateToProps({ profileApp }) {
  console.log(profileApp.profile);
  return {
    tags: profileApp.profile.tags
  };
}

export default withStyles(styles, { withTheme: true })(
  connect(
    mapStateToProps,
    mapDispatchToProdps
  )(AboutTab)
);
