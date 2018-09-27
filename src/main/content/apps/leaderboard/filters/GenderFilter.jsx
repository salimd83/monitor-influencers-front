import React, { Component } from "react";
import { withStyles, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Icon } from "@material-ui/core";
import * as Fn from "fn/simpleCall.js";

const styles = theme => ({
  formControl: {
    marginTop: theme.spacing.unit
  },
  group: {
    margin: `${theme.spacing.unit * 2}px 0 0 0`,
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  cancelIcon: {
    cursor: "pointer"
  }
});

class GenderFilter extends Component {
  async componentDidMount() {
    const res = await await Fn.simpleCall("get", `typeahead/hashtag?q=male`);
    // console.log(res.data);
    const gender = res.data.filter(tag => tag.name.match(/^male$|^female$/));
    console.log(gender)
  }

  render() {
    const { classes, gender, setGender } = this.props;
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
          <FormControlLabel value="female" control={<Radio style={{ height: 30 }} />} label="Female" />
          <FormControlLabel value="male" control={<Radio style={{ height: 30 }} />} label="Male" />
          {gender && (
            <Icon size="small" color="secondary" className={classes.cancelIcon} onClick={() => setGender("")}>
              cancel
            </Icon>
          )}
        </RadioGroup>
      </FormControl>
    );
  }
}

export default withStyles(styles)(GenderFilter);
