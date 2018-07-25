import React, { Component } from "react";
import { Async } from "react-select";
import {
  InputLabel,
  FormControl,
  Select,
  Checkbox,
  Input,
  MenuItem,
  ListItemText
} from "@material-ui/core";

import * as Fn from "fn/simpleCall.js";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

class TypeFilter extends Component {
  state = {
    type: [],
    types: []
  };

  handleChange = event => {
    this.setState({ type: event.target.value });
  };

  async componentDidMount() {
    const response = await Fn.simpleCall("get", "typeahead/simedia_type");
    this.setState({
      types: response.data
    });
  }

  render() {
    const { selected, handleChange } = this.props;
    const { types } = this.state;
    return (
      <React.Fragment>
        <FormControl>
          <InputLabel shrink={true}>Media Type</InputLabel>
          <Select
            multiple
            value={this.state.type}
            onChange={this.handleChange}
            input={<Input id="select-multiple-checkbox" />}
            renderValue={selected => selected.join(", ")}
            MenuProps={MenuProps}
            style={{ width: "160px", fontSize: '13px' }}
          >
            {types &&
              types.length > 0 &&
              types.map(type => (
                <MenuItem key={type.id} value={type.id}>
                  <Checkbox checked={this.state.type.indexOf(type.name) > -1} />
                  <ListItemText primary={type.description} />
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </React.Fragment>
    );
  }
}

export default TypeFilter;
