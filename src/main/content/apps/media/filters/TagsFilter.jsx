import React, { Component } from "react";
import { Async } from "react-select";
import { InputLabel, FormControl } from "@material-ui/core";

import * as Fn from "fn/simpleCall.js";

class TagsFilter extends Component {
  getTagsOptions = (input, callback) => {

    const request = Fn.simpleCall("get", `typeahead/simedia_tag?q=${input}`);

    request.then(response => {
      // const ids = this.props.tags.map(tag => tag.id);

      // const filteredTags = response.data.filter(tag => {
      //   return !ids.includes(tag.id);
      // });

      callback(null, {
        options: response.data.map(tag => ({
          label: tag.name,
          value: tag.name,
          id: tag.id
        })),
        complete: true
      });
    });
  
  };

  render() {
    const { tags, tagsChange } = this.props;
    return (
      <React.Fragment>
        <FormControl>
          <InputLabel shrink={true}>Tags</InputLabel>
          <Async
            name="tags"
            onChange={tagsChange}
            value={tags}
            closeOnSelect={false}
            autoload={false}
            multi
            clearable={false}
            removeSelected={true}
            loadOptions={this.getTagsOptions}
            style={{ width: "200px" }}
          />
        </FormControl>
      </React.Fragment>
    );
  }
}

export default TagsFilter;
