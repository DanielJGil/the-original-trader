import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function SelectInput({
  label,
  value,
  handleChange,
  children,
  InputProps,
  defaultValue,
  id,
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
        // onChange={handleChange}
        id={id}
        // value={value}
        label={label}
        variant="outlined"
        select
        fullWidth
        InputProps={InputProps}
        defaultValue={defaultValue}
      >
        {children}
      </TextField>
    </Box>
  );
}
