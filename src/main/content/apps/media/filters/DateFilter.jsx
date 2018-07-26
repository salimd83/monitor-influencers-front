import React from 'react';
import { Grid, InputLabel, FormControl } from '@material-ui/core';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

const DateFilter = props => {
  const { fromChange, toChange, from, to } = props;
  return (
    <React.Fragment>
      <Grid container>
        <Grid item>
            <InputLabel style={{fontSize: '13px'}} shrink={true}>From</InputLabel>
            <DatePicker
              id="date"
              label="From"
              name="from"
              onChange={fromChange}
              type="text"
              dateFormat="DD-MM-YYYY HH:mm"
              timeFormat="HH:mm"
              showTimeSelect
              selected={from ? moment(from) : moment().add(-1, 'days')}
              maxDate={moment().add(-1, 'hours')}
              minDate={moment.utc('2012-01-01 00:00:00')}
            />
        </Grid>
        <Grid item>
            <InputLabel style={{fontSize: '13px'}} shrink={true}>To</InputLabel>
            <DatePicker
              id="date"
              label="to"
              name="to"
              onChange={toChange}
              type="text"
              dateFormat="DD-MM-YYYY HH:mm"
              timeFormat="HH:mm"
              showTimeSelect
              selected={to ? moment(to) : moment()}
              maxDate={moment()}
              minDate={moment(from).add(1, 'days')}
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
