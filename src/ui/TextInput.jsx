import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function TextInput({
  label,
  InputProps,
  defaultValue,
  error,
  helperText,
  disabled,
  sx,
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
        error={error}
        helperText={helperText}
        disabled={disabled}
        sx={sx}
      />
    </Box>
  );
}
