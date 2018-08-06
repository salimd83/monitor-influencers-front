import React, { Component } from "react";
import { Async } from "react-select";
import { InputLabel, FormControl } from "@material-ui/core";

import * as Fn from "fn/simpleCall.js";

class TagsFilter extends Component {
  getTagsOptions = (input, callback) => {
    const req1 = Fn.simpleCall("get", `typeahead/simedia_tag?q=${input}`);
    const req2 = Fn.simpleCall("get", `typeahead/media_label?q=${input}`);
    const req3 = Fn.simpleCall("get", `typeahead/location?q=${input}`);
    const req4 = Fn.simpleCall("get", `typeahead/brand?q=${input}`);

    Promise.all([req1, req2, req3, req4])
      .then(response => {
        
        const data = response.map(res => res.data)
        console.log('data', data)
        const flatData = [].concat(...data)
        console.log('flat',flatData)
        callback(null, {
          options: flatData.map(tag => ({
            label: tag.name,
            value: tag.name,
            id: tag.id
          })),
          complete: true
        });
      })
      .catch(e => console.log(e));
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
