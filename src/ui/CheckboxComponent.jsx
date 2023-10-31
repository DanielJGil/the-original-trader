import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function CheckboxComponent({
  checked,
  handleChange,
  legend,
  label,
}) {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{legend}</FormLabel>
      <FormGroup aria-label="position" row>
        <FormControlLabel
          value="end"
          control={
            <Checkbox
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
          }
          label={label}
          labelPlacement="end"
        />
      </FormGroup>
    </FormControl>
  );
}
