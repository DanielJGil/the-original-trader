import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function DatePickerInput({ label, value, handleChange }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={["DatePicker"]}
        sx={{ width: "100%", marginTop: "-8px" }}
      >
        <DatePicker
          sx={{ width: "100%" }}
          label={label}
          value={value}
          onChange={handleChange}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
