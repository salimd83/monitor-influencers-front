import React from 'react';
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText
} from '@material-ui/core';

const InputField = ({ label, data, id, error, errorText, ...rest }) => {
  return (
    <FormControl fullWidth error={error ? true : false}>
      <InputLabel htmlFor={id}>{label}</InputLabel>

      <Input {...{ ...rest, id, error }} />
      {error && <FormHelperText id={id}>{errorText}</FormHelperText>}
    </FormControl>
  );
};

export default InputField;
