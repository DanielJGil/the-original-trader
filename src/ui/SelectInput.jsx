import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function SelectInput({ label, value, handleChange, children }) {
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
        value={value}
        label={label}
        onChange={handleChange}
        variant="outlined"
        select
        fullWidth
      >
        {children}
      </TextField>
    </Box>
  );
}
