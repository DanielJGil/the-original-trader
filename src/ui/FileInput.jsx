import React from "react";
import { MuiFileInput } from "mui-file-input";

export default function FileInput({ file, handleChange, label }) {
  return (
    <MuiFileInput
      label={label}
      value={file}
      onChange={handleChange}
      sx={{ width: "100%" }}
    />
  );
}
