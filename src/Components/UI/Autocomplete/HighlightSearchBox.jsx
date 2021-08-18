/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';


export default function HighlightSearchBox(props) {
  return (
    <Autocomplete
      value = {props.value}
      onChange = {props.changed}
      id="highlights-demo"
      //inputClass = "autocomplete"
      style={{ width: 300, marginBottom: 7, marginRight: 3 }}
      options={props.options}
      getOptionLabel={(option) => option ? option.name : ""}
      renderInput={(params) => (
        <TextField {...params} label="Products..." variant="outlined" margin="normal" />
      )}
      renderOption={(option, { inputValue }) => {
        const matches = match(option.name, inputValue);
        const parts = parse(option.name, matches);

        return (
          <div>
            {parts.map((part, index) => (
              <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                {part.text}
              </span>
            ))}
          </div>
        );
      }}
    />
  );
}