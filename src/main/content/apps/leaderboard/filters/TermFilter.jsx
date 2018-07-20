import React from "react";
import { InputLabel, FormControl, TextField } from "@material-ui/core";

const TermFilter = ({setTerm, term}) => {
  return (
    <FormControl>
      <InputLabel shrink={true} style={{marginTop: '-4px'}}>Search</InputLabel>
      <TextField
        placeholder="Search for anything"
        fullWidth
        value={term}
        style={{marginTop: '14px'}}
        inputProps={{
          "aria-label": "Search"
        }}
        onChange={e => setTerm(e.target.value)}
      />
    </FormControl>
  );
};

export default TermFilter;
