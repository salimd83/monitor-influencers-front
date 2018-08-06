import React, { Component } from "react";
import { Async } from "react-select";
import { InputLabel, FormControl } from "@material-ui/core";

import * as Fn from "fn/simpleCall.js";

class IndustriesFilter extends Component {
  getIndustriesOptions = (input, callback) => {
    const request = Fn.simpleCall("get", `typeahead/industry?q=${input}`);

    request.then(response => {
      callback(null, {
        options: response.data.map(industry => ({
          label: industry.name,
          value: industry.id
        })),
        complete: true
      }).catch(e => console.log(e));
    });
  };

  render() {
    const { industry, setIndustry } = this.props;
    return (
      <React.Fragment>
        <FormControl>
          <InputLabel shrink={true} style={{marginTop: '-4px'}}>Industries</InputLabel>
          <Async
            name="profile"
            onChange={setIndustry}
            value={industry}
            clearable={false}
            autoBlur={true}
            removeSelected={true}
            loadOptions={this.getIndustriesOptions}
            style={{ width: "200px", marginTop: '10px' }}
          />
        </FormControl>
      </React.Fragment>
    );
  }
}

export default IndustriesFilter;
