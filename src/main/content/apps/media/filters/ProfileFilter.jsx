import React, { Component } from "react";
import { Async } from "react-select";
import { InputLabel, FormControl } from "@material-ui/core";

import * as Fn from "fn/simpleCall.js";

class ProfileFilter extends Component {
  getProfileOptions = (input, callback) => {
    if (input === "") {
      callback(null, {
        options: [],
        completed: true
      });
    } else {
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
    }
  };

  render() {
    const { profileChange, profile } = this.props;
    return (
      <React.Fragment>
        <FormControl>
          <InputLabel shrink={true}>Profile</InputLabel>
          <Async
            name="profile"
            onChange={profileChange}
            value={profile}
            clearable={true}
            cache={false}
            autoBlur={true}
            autoload={false}
            removeSelected={true}
            loadOptions={this.getProfileOptions}
            style={{ width: "160px" }}
          />
        </FormControl>
      </React.Fragment>
    );
  }
}

export default ProfileFilter;
