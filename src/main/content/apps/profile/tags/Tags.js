import React, { Component } from "react";
import { AppBar, Card, CardContent, Toolbar, Typography, Chip } from "@material-ui/core";
import { Async } from "react-select";
import "react-select/dist/react-select.css";

import * as Fn from "fn/simpleCall.js";

class Tags extends Component {
  state = {
    selectedTags: this.props.tags.map(tag => ({
      label: `${tag.type}/${tag.name}`,
      value: tag.name,
      name: tag.name,
      type: tag.type,
      id: tag.id
    }))
  };

  getTagsOptions = (input, callback) => {
    const request = Fn.simpleCall("get", `typeahead/profile_tag?q=${input}`);

    request.then(response => {
      const ids = this.props.tags.map(tag => tag.id);

      const filteredTags = response.data.filter(tag => {
        return !ids.includes(tag.id);
      });

      callback(null, {
        options: filteredTags.map(tag => ({
          label: tag.name,
          value: tag.name,
          name: tag.name,
          type: tag.type,
          id: tag.id
        })),
        complete: true
      });
    });
  };

  handleAsyncSelectChange = selectedOptions => {
    const stateTags = this.state.selectedTags;

    if (stateTags.length > selectedOptions.length) {
      const lastTagInState = stateTags[stateTags.length - 1];
      this.handleTagDelete(lastTagInState);
    } else {
      const { addTag, profile } = this.props;
      addTag(selectedOptions[selectedOptions.length - 1], profile.id);
    }

    this.setState({
      selectedTags: selectedOptions
    });
  };

  handleTagDelete = tag => {
    this.setState({
      selectedTags: this.state.selectedTags.filter(selectedTag => selectedTag.id !== tag.id)
    });
    this.props.deleteTag(tag, this.props.profile.id);
  };

  render() {
    const { tags } = this.props;
    const { selectedTags } = this.state;

    return (
      <Card id="profile-tags" className="w-full mb-16" style={{ overflow: "initial" }}>
        <AppBar position="static" elevation={0}>
          <Toolbar className="pl-16 pr-8">
            <Typography variant="subheading" color="inherit" className="flex-1">
              Tags
            </Typography>
          </Toolbar>
        </AppBar>

        <CardContent>
          <div className="mb-24">
            <div className="mb-24">
              {!tags.length && <Typography className="mb-4 text-15">No tags.</Typography>}
              {/* {tags.length !== 0 &&
                tags.map(tag => (
                  <Chip
                    key={tag.id}
                    id={tag.id}
                    label={tag.name}
                    onDelete={() => this.handleTagDelete(tag)}
                    className="m-4"
                  />
                ))} */}
            </div>

            <Async
              name="profile-tags"
              onChange={this.handleAsyncSelectChange}
              value={selectedTags}
              closeOnSelect={false}
              multi
              clearable={false}
              removeSelected={true}
              loadOptions={this.getTagsOptions}
              style={{ zIndex: 1000 }}
            />
          </div>
        </CardContent>
      </Card>
    );
  }
}

export default Tags;
