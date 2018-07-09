import React from 'react'
import { FormControl, InputLabel, FormHelperText } from '@material-ui/core';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

const DateInput = ({ input: {value, onChange, ...restInput}, width, label, meta: { touched, error }, ...rest }) => {
  return (
    <FormControl fullWidth error={touched && !!error}>
      <InputLabel shrink={true}>{label}</InputLabel>
      <DatePicker
        {...rest}
        selected={value ? moment(value) : moment(new Date())}
        onChange={onChange}
        {...restInput}
      />
      {touched && error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  )
}

export default DateInput