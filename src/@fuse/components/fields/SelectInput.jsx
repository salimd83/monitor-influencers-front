import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@material-ui/core';

const SelectInput = ({ input, multiple, options, label, meta: { touched, error } }) => {
  return (
    <FormControl fullWidth error={touched && !!error}>
      <InputLabel shrink={true}>{label}</InputLabel>
      <Select
        value={input.value || ''}
        onChange={(e) => input.onChange(e.target.value)}
        multiple={multiple}
        inputProps={{
          name: input.name,
          id: input.name
        }}
      >
        {options &&
          options.map(item => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
      </Select>
      {touched && error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default SelectInput;
