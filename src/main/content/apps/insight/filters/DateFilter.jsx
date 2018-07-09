import React from 'react';
import { TextField, Grid } from '@material-ui/core';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

const DateFilter = props => {
  const { handleDateFromChange, handleDateToChange, from, to, maxFrom, maxTo } = props;
  return (
    <React.Fragment>
      <Grid container>
      <Grid item>
        <DatePicker
          id="date"
          label="From"
          name="from"
          onChange={handleDateFromChange}
          type="text"
          dateFormat="YYY-MM-DD HH:mm"
          timeFormat="HH:mm"
          showTimeSelect
          selected={from ? moment(from) : moment().add(-1, 'hours')}
          maxDate={moment().add(-1, 'hours')}
        />
      </Grid>
      <Grid item>
        <DatePicker
          id="date"
          label="to"
          name="to"
          onChange={handleDateToChange}
          type="text"
          dateFormat="YYY-MM-DD HH:mm"
          timeFormat="HH:mm"
          showTimeSelect
          selected={to ? moment(to) : moment()}
          maxDate={moment()}
          minDate={moment(from).add(1, 'hours')}
        />
      </Grid>
      </Grid>
      {/* <TextField
        id="date"
        label="To"
        name="to"
        onChange={handleDateToChange}
        type="datetime-local"
        defaultValue={to}
        InputLabelProps={{
          shrink: true
        }}
        inputProps={{
          max: maxTo,
          required: 'required'
        }}
      /> */}
    </React.Fragment>
  );
};

export default DateFilter;
