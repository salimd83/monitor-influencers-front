import React, { Component } from "react";
import { Async } from "react-select";
import { InputLabel, FormControl } from "@material-ui/core";

import * as Fn from "fn/simpleCall.js";

class TagsFilter extends Component {
  getTagsOptions = (input, callback) => {
    if (input === "") {
      callback(null, {
        options: [],
        completed: true
      });
    } else {
    const request = Fn.simpleCall("get", `typeahead/profile_tag?q=${input}`);

    request.then(response => {
      // const ids = this.props.tags.map(tag => tag.id);

      // const filteredTags = response.data.filter(tag => {
      //   return !ids.includes(tag.id);
      // });

      callback(null, {
        options: response.data.map(tag => ({
          label: tag.name,
          value: tag.name,
          name: tag.name,
          type: tag.type,
          id: tag.id
        })),
        complete: true
      });
    });
  }
  };

  render() {
    const { selected, handleChange } = this.props;
    return (
      <React.Fragment>
        <FormControl>
          <InputLabel shrink={true}>Tags</InputLabel>
          <Async
            name="tags"
            onChange={handleChange}
            value={selected}
            closeOnSelect={false}
            multi
            clearable={false}
            removeSelected={true}
            loadOptions={this.getTagsOptions}
            style={{ width: "160px" }}
          />
        </FormControl>
      </React.Fragment>
    );
  }
}

export default TagsFilter;
