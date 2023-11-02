import { Button, InputAdornment, MenuItem } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

import { Controller, useForm } from "react-hook-form";

import SelectInput from "../../ui/SelectInput";
import TextInput from "../../ui/TextInput";
import TextAreaInput from "../../ui/TextAreaInput";
import { MuiFileInput } from "mui-file-input";
import Spinner from "../../ui/Spinner";

import { useCreateTrade } from "./useCreateTrade";
import { useNavigate } from "react-router-dom";

function CreateTradeForm() {
  const navigate = useNavigate();

  const { register, handleSubmit, control, reset, formState } = useForm();
  const { errors } = formState;

  const { createTrade, isCreating } = useCreateTrade();

  function onSubmit(data) {
    createTrade(
      {
        ...data,
        date: String(data.date.$d).slice(0, 15),
      },
      {
        onSuccess: () => reset(),
      }
    );
  }

  function onError(errors) {
    console.log(errors);
  }

  // if (isCreating) return <Spinner />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Add new trade</h2>

      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="mb-5 flex gap-6 flex-col sm:flex-row sm:justify-between">
          <SelectInput
            label="TYPE"
            id="type"
            defaultValue=""
            error={errors?.type?.message && true}
            helperText={errors?.type?.message}
            disabled={isCreating}
            InputProps={{
              ...register("type", {
                required: "This field is required",
              }),
            }}
          >
            <MenuItem value="BUY">BUY</MenuItem>
            <MenuItem value="SELL">SELL</MenuItem>
          </SelectInput>

          <TextInput
            label="PAIR"
            id="pair"
            defaultValue=""
            error={errors?.pair?.message && true}
            helperText={errors?.pair?.message}
            disabled={isCreating}
            InputProps={{
              ...register("pair", {
                required: "This field is required",
              }),
            }}
          />
          <SelectInput
            label="SESSION"
            id="session"
            defaultValue=""
            error={errors?.session?.message && true}
            helperText={errors?.session?.message}
            disabled={isCreating}
            InputProps={{
              ...register("session", {
                required: "This field is required",
              }),
            }}
          >
            <MenuItem value="LONDON">LONDON</MenuItem>
            <MenuItem value="NEW YORK">NEW YORK</MenuItem>
            <MenuItem value="LONDON CLOSE">LONDON CLOSE</MenuItem>
            <MenuItem value="OUTSIDE OF SESSION">OUTSIDE OF SESSION</MenuItem>
          </SelectInput>
        </div>

        <div className="mb-5 flex gap-6 flex-col sm:flex-row sm:justify-between">
          <TextInput
            label="RISK"
            id="risk"
            defaultValue=""
            error={errors?.risk?.message && true}
            helperText={errors?.risk?.message}
            disabled={isCreating}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">%</InputAdornment>
              ),
              ...register("risk", {
                required: "This field is required",
                min: {
                  value: 0.01,
                  message: "Risk percentage should be at least 0.01",
                },
              }),
            }}
          />

          <SelectInput
            label="OUTCOME"
            id="outcome"
            defaultValue=""
            error={errors?.outcome?.message && true}
            helperText={errors?.outcome?.message}
            disabled={isCreating}
            InputProps={{
              ...register("outcome", {
                required: "This field is required",
              }),
            }}
          >
            <MenuItem value="WIN">WIN</MenuItem>
            <MenuItem value="LOSS">LOSS</MenuItem>
            <MenuItem value="BREAK EVEN">BREAK EVEN</MenuItem>
          </SelectInput>

          <TextInput
            label="PROFIT"
            id="profit"
            defaultValue=""
            error={errors?.profit?.message && true}
            helperText={errors?.profit?.message}
            disabled={isCreating}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
              ...register("profit", {
                required: "This field is required",
              }),
            }}
          />
        </div>

        <div className="mb-5 flex gap-6 flex-col sm:flex-row sm:justify-between">
          <Controller
            name="date"
            control={control}
            rules={{ required: "This field is required" }}
            defaultValue={null}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  components={["DatePicker"]}
                  sx={{ width: "100%", marginTop: "-8px" }}
                >
                  <DatePicker
                    sx={{ width: "100%" }}
                    slotProps={{
                      textField: {
                        error: errors?.date && true,
                        helperText: errors?.date?.message,
                        disabled: isCreating,
                      },
                    }}
                    label="DATE"
                    {...field}
                  />
                </DemoContainer>
              </LocalizationProvider>
            )}
          />

          <Controller
            name="image"
            control={control}
            rules={{ required: "This field is required" }}
            render={({ field, fieldState }) => (
              <MuiFileInput
                {...field}
                sx={{ width: "100%" }}
                label="TRADE IMAGE"
                helperText={fieldState.invalid ? "Please add an image" : ""}
                error={fieldState.invalid}
              />
            )}
          />

          {/* <FileInput
            file={tradeImage}
            handleChange={(newFile) => setTradeImage(newFile)}
            label="TRADE IMAGE"
          /> */}
        </div>

        <div className="mb-5 flex gap-6 flex-col sm:flex-row sm:justify-between">
          <TextAreaInput
            label="TRADE ANALYSIS"
            id="analysis"
            defaultValue=""
            disabled={isCreating}
            InputProps={{ ...register("analysis") }}
          />
        </div>

        <div className="mb-5 flex gap-6 flex-col sm:flex-row sm:justify-between">
          <TextAreaInput
            label="ERRORS MADE"
            id="tradeErrors"
            defaultValue=""
            disabled={isCreating}
            InputProps={{ ...register("tradeErrors") }}
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate("/trades")}
            disabled={isCreating}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            size="large"
            type="submit"
            disabled={isCreating}
          >
            Add trade
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreateTradeForm;
