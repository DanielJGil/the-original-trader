import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function SelectInput({
  label,
  children,
  InputProps,
  defaultValue,
  id,
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
        id={id}
        label={label}
        variant="outlined"
        select
        fullWidth
        InputProps={InputProps}
        defaultValue={defaultValue}
        error={error}
        helperText={helperText}
        disabled={disabled}
        sx={sx}
      >
        {children}
      </TextField>
    </Box>
  );
}
