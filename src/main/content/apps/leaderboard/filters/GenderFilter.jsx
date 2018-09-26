import React from "react";
import { withStyles, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Icon } from "@material-ui/core";

const styles = theme => ({
  formControl: {
    marginTop: theme.spacing.unit
  },
  group: {
    margin: `${theme.spacing.unit*2}px 0 0 0`,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cancelIcon: {
    cursor: 'pointer',
  }
});

const GenderFilter = ({ classes, gender, setGender }) => {
  return (
    <FormControl component="fieldset" className={classes.formControl}>
      <FormLabel component="legend">Gender</FormLabel>
      <RadioGroup
        aria-label="Gender"
        name="gender1"
        className={classes.group}
        value={gender}
        onChange={e => setGender(e.target.value)}
      >
        <FormControlLabel value="female" control={<Radio style={{height: 30}} />} label="Female" />
        <FormControlLabel value="male" control={<Radio style={{height: 30}} />} label="Male" />
        {gender && <Icon size="small" color="secondary" className={classes.cancelIcon} onClick={() => setGender('')}>cancel</Icon>}
      </RadioGroup>
    </FormControl>
  );
};

export default withStyles(styles)(GenderFilter);
