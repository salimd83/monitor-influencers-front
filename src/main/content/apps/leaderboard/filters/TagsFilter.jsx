import React, { Component } from "react";
import { Async } from "react-select";
import { InputLabel, FormControl } from "@material-ui/core";

import * as Fn from "fn/simpleCall.js";

class TagsFilter extends Component {
  getTagsOptions = (input, callback) => {
    const req = Fn.simpleCall("get", `typeahead/profile_tag`, { q: input });

    req
      .then(response => {
        const data = response.data;
        const flatData = [].concat(...data);
        callback(null, {
          options: flatData.map(tag => ({
            label: `${tag.name} (${tag.type})`,
            value: tag.name,
            id: tag.id
          })),
          complete: true
        });
      })
      .catch(e => console.log(e));
  };

  render() {
    const { tags, setTags } = this.props;
    return (
      <React.Fragment>
        <FormControl style={{marginTop: 10}}>
          <InputLabel shrink={true}>Tags</InputLabel>
          <Async
            name="tags"
            onChange={setTags}
            value={tags}
            closeOnSelect={false}
            autoload={false}
            multi
            clearable={false}
            removeSelected={true}
            loadOptions={this.getTagsOptions}
            style={{ width: "190px" }}
          />
        </FormControl>
      </React.Fragment>
    );
  }
}

export default TagsFilter;
