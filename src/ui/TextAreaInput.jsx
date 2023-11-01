import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function TextAreaInput({
  label,
  InputProps,
  defaultValue,
  disabled,
}) {
  return (
    <Box
      sx={{
        width: "100%",
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        label={label}
        variant="outlined"
        InputProps={InputProps}
        defaultValue={defaultValue}
        fullWidth
        multiline
        disabled={disabled}
      />
    </Box>
  );
}
