import React from 'react';
import { FormControl, InputLabel, Input, FormHelperText } from '@material-ui/core';

const TextInput = ({ input, type, label, meta: { touched, error }, ...rest }) => {
  return (
    <FormControl fullWidth error={touched && !!error}>
      <InputLabel shrink={true}>{label}</InputLabel>

      <Input inputProps={input} {...rest} type={type} />
      {touched && error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default TextInput;
