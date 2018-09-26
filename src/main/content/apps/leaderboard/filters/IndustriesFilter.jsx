import React, { Component } from "react";
import { InputLabel, FormControl, Select, MenuItem } from "@material-ui/core";

import * as Fn from "fn/simpleCall.js";

class IndustriesFilter extends Component {
  state = {
    industries: []
  };

  async componentDidMount() {
    const request = await Fn.simpleCall("get", `typeahead/industry`);
    this.setState({
      industries: request.data.map(industry => ({
        label: industry.name,
        value: industry.id
      }))
    });
  }

  handleIndustry = (e) => {
    this.props.setIndustry(e.target.value)
  }

  render() {
    const { industry } = this.props;
    return (
      <React.Fragment>
        <FormControl>
          <InputLabel htmlFor="indutries">Industry</InputLabel>
          <Select
            value={industry}
            onChange={this.handleIndustry}
            inputProps={{
              name: "indutries",
              id: "industries"
            }}
            style={{ width: 195 }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {this.state.industries.sort((a,b) => a.label > b.label).map(ind => <MenuItem key={ind.value} value={ind.value}>{ind.label}</MenuItem>)}
          </Select>
        </FormControl>
      </React.Fragment>
    );
  }
}

export default IndustriesFilter;
