import React, { Component } from "react";
import { InputLabel, FormControl, Select, MenuItem } from "@material-ui/core";

import * as Fn from "fn/simpleCall.js";

class LanguageFilter extends Component {
  state = {
    languages: []
  };

  async componentDidMount() {
    const request = await Fn.simpleCall("get", `typeahead/language`);
    this.setState({
      languages: request.data.map(language => ({
        label: language.name,
        value: language.id
      }))
    });
  }

  handlelanguage = (e) => {
    console.log('e.target.value', e.target.value)
    this.props.setLanguage(e.target.value)
  }

  render() {
    const { language } = this.props;
    return (
      <React.Fragment>
        <FormControl>
          <InputLabel htmlFor="languages">Language</InputLabel>
          <Select
            value={language}
            onChange={this.handlelanguage}
            inputProps={{
              name: "languages",
              id: "languages"
            }}
            style={{ width: 195 }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {this.state.languages.sort((a,b) => a.label > b.label).map(lang => <MenuItem key={lang.value} value={lang.value}>{lang.label}</MenuItem>)}
          </Select>
        </FormControl>
      </React.Fragment>
    );
  }
}

export default LanguageFilter;
