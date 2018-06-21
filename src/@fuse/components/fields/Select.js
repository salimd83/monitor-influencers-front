import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText
} from '@material-ui/core';

const SelectField = ({ label, data, id, error, errorText, ...rest }) => {
  return (
    <FormControl fullWidth error={error ? true : false}>
      <InputLabel htmlFor={id}>{label}</InputLabel>

      <Select
        {...{ ...rest, id, error }}
        inputProps={{
          name: id,
          id: id
        }}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {data.map(item => (
          <MenuItem key={item.id} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText id={id}>{errorText}</FormHelperText>}
    </FormControl>
  );
};

export default SelectField;
