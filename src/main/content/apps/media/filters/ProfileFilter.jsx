import React, { Component } from "react";
import Autosuggest from "react-autosuggest";
import { InputLabel, FormControl, Icon } from "@material-ui/core";

import * as Fn from "fn/simpleCall.js";

const getSuggestionValue = suggestion => `${suggestion.first_name} ${suggestion.last_name}`;

const renderSuggestion = suggestion => {
  return <div>{`${suggestion.first_name} ${suggestion.last_name}`}</div>;
};

class ProfileFilter extends Component {
  state = {
    value: "",
    suggestions: []
  };
  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };
  getSuggestions = async value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    if (inputLength === 0) {
      return [];
    } else {
      try {
        const response = await Fn.simpleCall("get", `si/profiles?search=${value}&limit=10`);
        this.setState({
          suggestions: response.data
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  onSuggestionsFetchRequested = ({ value }) => {
    this.getSuggestions(value);
  };
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };
  onSuggestionSelected = (event, { suggestion }) => {
    this.props.profileChange(suggestion);
  };
  getProfileOptions = (input, callback) => {
    if (input === "") {
      callback(null, {
        options: [],
        completed: true
      });
    } else {
      try {
        const request = Fn.simpleCall("get", `si/profiles?search=${input}&limit=10`);

        request.then(response => {
          callback(null, {
            options: response.data.map(profile => ({
              label: `${profile.first_name} ${profile.last_name}`,
              value: profile.id
            })),
            cache: false,
            complete: true
          });
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  clearInput = () => {
    this.props.profileChange({});
  };

  componentDidUpdate(prevProps) {
    if (this.props.profile.first_name !== prevProps.profile.first_name) {
      this.setState({
        value: this.props.profile.first_name
          ? `${this.props.profile.first_name} ${this.props.profile.last_name || ""}`
          : ""
      });
    }
  }

  render() {
    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: "Search",
      value,
      onChange: this.onChange
    };

    return (
      <React.Fragment>
        <FormControl>
          <InputLabel shrink={true}>Profile</InputLabel>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
            onSuggestionSelected={this.onSuggestionSelected}
          />
          {value && (
            <div className="clear-input">
              <Icon onClick={this.clearInput}>close</Icon>
            </div>
          )}
        </FormControl>
      </React.Fragment>
    );
  }
}

export default ProfileFilter;
