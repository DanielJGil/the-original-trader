import { Button, InputAdornment, MenuItem } from "@mui/material";
import SelectInput from "../../ui/SelectInput";
import TextInput from "../../ui/TextInput";
import FileInput from "../../ui/FileInput";
import { Controller, useForm } from "react-hook-form";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTrade } from "../../services/apiTrades";
import toast from "react-hot-toast";

function CreateTradeForm() {
  const navigate = useNavigate();

  const { register, handleSubmit, control, reset } = useForm();

  const queryClient = useQueryClient();

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createTrade,
    onSuccess: () => {
      toast.success("New trade successfully added");
      queryClient.invalidateQueries({
        queryKey: ["trades"],
      });
      reset();
      navigate("/trades");
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data) {
    mutate({ ...data, date: String(data.date.$d).slice(0, 24) });

    // console.log({ ...data, date: String(data.date.$d).slice(0, 24) });
  }

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Add new trade</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5 flex gap-6 flex-col sm:flex-row sm:justify-between">
          <SelectInput
            label="TYPE"
            id="type"
            defaultValue=""
            InputProps={{ ...register("type") }}
          >
            <MenuItem value="BUY">BUY</MenuItem>
            <MenuItem value="SELL">SELL</MenuItem>
          </SelectInput>

          <TextInput
            label="PAIR"
            id="pair"
            defaultValue=""
            InputProps={{ ...register("pair") }}
          />

          <SelectInput
            label="SESSION"
            id="session"
            defaultValue=""
            InputProps={{ ...register("session") }}
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
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">%</InputAdornment>
              ),
              ...register("risk"),
            }}
          />

          <SelectInput
            label="OUTCOME"
            id="outcome"
            defaultValue=""
            InputProps={{ ...register("outcome") }}
          >
            <MenuItem value="WIN">WIN</MenuItem>
            <MenuItem value="LOSS">LOSS</MenuItem>
            <MenuItem value="BREAK EVEN">BREAK EVEN</MenuItem>
          </SelectInput>

          <TextInput
            label="PROFIT"
            id="profit"
            defaultValue=""
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
              ...register("profit"),
            }}
          />
        </div>

        <div className="mb-5 flex gap-6 flex-col sm:flex-row sm:justify-between">
          <Controller
            name="date"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  components={["DatePicker"]}
                  sx={{ width: "100%", marginTop: "-8px" }}
                >
                  <DatePicker sx={{ width: "100%" }} label="DATE" {...field} />
                </DemoContainer>
              </LocalizationProvider>
            )}
          />

          {/* <FileInput
            file={tradeImage}
            handleChange={(newFile) => setTradeImage(newFile)}
            label="TRADE IMAGE"
          /> */}
        </div>

        <div className="mb-5 flex gap-6 flex-col sm:flex-row sm:justify-between">
          <TextInput
            label="TRADE ANALYSIS"
            id="analysis"
            defaultValue=""
            InputProps={{ ...register("analysis") }}
          />
        </div>

        <div className="mb-5 flex gap-6 flex-col sm:flex-row sm:justify-between">
          <TextInput
            label="ERRORS MADE"
            id="tradeErrors"
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
