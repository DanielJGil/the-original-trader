import { Button, InputAdornment, TextField } from "@mui/material";
import { useTrade } from "./useTrade";
import Spinner from "../../ui/Spinner";
import dayjs from "dayjs";
import { formatCurrency } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";

function TradeDetail() {
  const navigate = useNavigate();

  const { trade, isLoading } = useTrade();

  if (isLoading) return <Spinner />;

  const {
    pair,
    outcome,
    date,
    type,
    session,
    risk,
    image,
    analysis,
    tradeErrors,
    profit,
  } = trade;

  return (
    <>
      <div className="mb-5 flex justify-between">
        <h1 className="font-semibold text-2xl">Trade Details</h1>

        <Button
          variant="outlined"
          size="small"
          onClick={() => navigate("/trades")}
        >
          &larr; Go back
        </Button>
      </div>

      <div className="border border-slate-300 rounded">
        <div
          className={`flex justify-between items-center ${
            outcome === "WIN" && "bg-green-300"
          } ${outcome === "LOSS" && "bg-red-300"} ${
            outcome === "BREAK EVEN" && "bg-slate-200"
          } p-4 items-center `}
        >
          <div className="flex gap-3 items-center">
            <p className="font-semibold text-xl">{pair}</p>
            <p>{outcome}</p>
          </div>
          <p className="uppercase">{dayjs(date).format("d MMM YYYY")}</p>
        </div>

        <div className="p-5">
          <div className="mb-6">
            <img src={image} alt="trade" />
          </div>

          <div
            className={`flex gap-6 justify-center ${analysis !== "" && "mb-5"}`}
          >
            <TextField
              id="type"
              label="TYPE"
              defaultValue={type}
              fullWidth
              disabled
              sx={{
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: "#37474f",
                },
              }}
            />

            <TextField
              id="session"
              label="SESSION"
              defaultValue={session}
              fullWidth
              disabled
              sx={{
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: "#37474f",
                },
              }}
            />

            <TextField
              id="risk"
              label="RISK"
              defaultValue={risk}
              fullWidth
              disabled
              sx={{
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: "#37474f",
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">%</InputAdornment>
                ),
              }}
            />
          </div>

          {analysis !== "" && (
            <div className={`${tradeErrors !== "" && "mb-5"}`}>
              <TextField
                id="analysis"
                label="TRADE ANALYSIS"
                defaultValue={analysis}
                fullWidth
                multiline
                rows={4}
                disabled
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#37474f",
                  },
                }}
              />
            </div>
          )}

          {tradeErrors !== "" && (
            <div>
              <TextField
                id="tradeErrors"
                label="ERRORS MADE"
                defaultValue={tradeErrors}
                fullWidth
                multiline
                rows={4}
                disabled
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#37474f",
                  },
                }}
              />
            </div>
          )}
        </div>

        <div
          className={`flex justify-between items-center ${
            outcome === "WIN" && "bg-green-300"
          } ${outcome === "LOSS" && "bg-red-300"} ${
            outcome === "BREAK EVEN" && "bg-slate-200"
          } p-4`}
        >
          <p className="font-semibold text-xl">Total profit:</p>
          <p className="font-semibold text-xl">{formatCurrency(profit)}</p>
        </div>
      </div>
    </>
  );
}

export default TradeDetail;
