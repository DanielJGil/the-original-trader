import { Button, InputAdornment, MenuItem } from "@mui/material";
import SelectInput from "../../ui/SelectInput";
import { useState } from "react";
import TextInput from "../../ui/TextInput";
import DatePickerInput from "../../ui/DatePickerInput";
import FileInput from "../../ui/FileInput";
import CheckboxComponent from "../../ui/CheckboxComponent";

function CreateTradeForm() {
  const [type, setType] = useState("");
  const [pair, setPair] = useState("");
  const [session, setSession] = useState("");
  const [risk, setRisk] = useState("");
  const [outcome, setOutcome] = useState("");
  const [profit, setProfit] = useState("");
  const [date, setDate] = useState(null);
  const [tradeImage, setTradeImage] = useState(null);
  const [analysis, setAnalysis] = useState("");
  const [followedPlan, setFollowedPlan] = useState(false);
  const [tradeErrors, setTradeErrors] = useState("");

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Add new trade</h2>

      <form method="POST">
        <div className="mb-5 flex gap-6 flex-col sm:flex-row sm:justify-between">
          <SelectInput
            label="TYPE"
            id="TYPE"
            value={type}
            handleChange={(e) => setType(e.target.value)}
          >
            <MenuItem value="BUY">BUY</MenuItem>
            <MenuItem value="SELL">SELL</MenuItem>
          </SelectInput>

          <TextInput
            label="PAIR"
            value={pair}
            handleChange={(e) => setPair(e.target.value)}
          />

          <SelectInput
            label="SESSION"
            value={session}
            handleChange={(e) => setSession(e.target.value)}
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
            value={risk}
            handleChange={(e) => setRisk(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">%</InputAdornment>
              ),
            }}
          />

          <SelectInput
            label="OUTCOME"
            value={outcome}
            handleChange={(e) => setOutcome(e.target.value)}
          >
            <MenuItem value="WIN">WIN</MenuItem>
            <MenuItem value="LOSS">LOSS</MenuItem>
            <MenuItem value="BREAK EVEN">BREAK EVEN</MenuItem>
          </SelectInput>

          <TextInput
            label="PROFIT"
            value={profit}
            handleChange={(e) => setProfit(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
        </div>

        <div className="mb-5 flex gap-6 flex-col sm:flex-row sm:justify-between">
          <DatePickerInput
            label="DATE"
            value={date}
            handleChange={(e) => setDate(e.target.value)}
          />

          <FileInput
            file={tradeImage}
            handleChange={(newFile) => setTradeImage(newFile)}
            label="TRADE IMAGE"
          />
        </div>

        <div className="mb-5 flex gap-6 flex-col sm:flex-row sm:justify-between">
          <TextInput
            label="TRADE ANALYSIS"
            value={analysis}
            handleChange={(e) => setAnalysis(e.target.value)}
          />
        </div>

        <div className="mb-5 flex gap-6 flex-col sm:flex-row sm:justify-between">
          <CheckboxComponent
            legend="DID YOU FOLLOW YOUR PLAN?"
            checked={followedPlan}
            label="YES"
            handleChange={(e) => setFollowedPlan(e.target.checked)}
          />
        </div>

        {!followedPlan && (
          <div className="mb-5 flex gap-6 flex-col sm:flex-row sm:justify-between">
            <TextInput
              label="ERRORS MADE"
              value={tradeErrors}
              handleChange={(e) => setTradeErrors(e.target.value)}
            />
          </div>
        )}

        <div className="flex justify-end">
          <Button variant="contained" size="large">
            Add trade
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreateTradeForm;
