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
    types: []
  };

  async componentDidMount() {
    const response = await Fn.simpleCall("get", "typeahead/simedia_type");
    this.setState({
      types: response.data
    });
  }

  render() {
    const { types, typesChange } = this.props;
    return (
      <React.Fragment>
        <FormControl>
          <InputLabel shrink={true}>Media Type</InputLabel>
          <Select
            multiple
            value={types}
            onChange={typesChange}
            input={<Input id="select-multiple-checkbox" />}
            renderValue={selected => selected.join(", ")}
            MenuProps={MenuProps}
            style={{ width: "160px", fontSize: "13px" }}
          >
            {this.state.types &&
              this.state.types.length > 0 &&
              this.state.types.map(type => (
                <MenuItem key={type.id} value={type.id}>
                  <Checkbox checked={types.indexOf(type.name) > -1} />
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
