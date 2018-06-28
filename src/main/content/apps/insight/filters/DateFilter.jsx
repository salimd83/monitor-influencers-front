import React from 'react';
import { TextField, Icon } from '@material-ui/core';

const DateFilter = props => {
  const {handleChange, from, to, maxFrom, maxTo} = props;
  return (
    <React.Fragment>
      <TextField
        id="date"
        label="From"
        name="from"
        onChange={handleChange}
        type="date"
        defaultValue={from}
        InputLabelProps={{
          shrink: true
        }}
        inputProps={{
          max: maxFrom,
          required: "required"
        }}
      />
      <TextField
        id="date"
        label="To"
        name="to"
        onChange={handleChange}
        type="date"
        defaultValue={to}
        InputLabelProps={{
          shrink: true
        }}
        inputProps={{
          max: maxTo,
          required: "required"
        }}
      />
    </React.Fragment>
  );
};

export default DateFilter;
