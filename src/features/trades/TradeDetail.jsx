import { Button, InputAdornment, Skeleton, TextField } from "@mui/material";
import { useTrade } from "./useTrade";
import dayjs from "dayjs";
import { formatCurrency } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../../context/DarkModeContext";

function TradeDetail() {
  const navigate = useNavigate();

  const { isDarkMode } = useDarkMode();

  const { trade, isLoading } = useTrade();

  if (isLoading)
    return (
      <div>
        <div className="mb-5 flex justify-between">
          <h1 className="font-semibold text-3xl">Trade Details</h1>

          <Button
            variant="outlined"
            size="small"
            onClick={() => navigate("/trades")}
          >
            &larr; Go back
          </Button>
        </div>
        <div className="flex flex-col gap-6">
          <Skeleton variant="rounded" width={"100%"} height={65} />
          <Skeleton variant="rounded" width={"100%"} height={400} />
          <Skeleton variant="rounded" width={"100%"} height={200} />
          <Skeleton variant="rounded" width={"100%"} height={65} />
        </div>
      </div>
    );

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
        <h1 className="font-semibold text-3xl">Trade Details</h1>

        <Button
          variant="outlined"
          size="small"
          onClick={() => navigate("/trades")}
        >
          &larr; Go back
        </Button>
      </div>

      <div>
        <div
          className={
            isDarkMode
              ? `flex justify-between items-center ${
                  outcome === "WIN" && "bg-green-700"
                } ${outcome === "LOSS" && "bg-red-700"} ${
                  outcome === "BREAK EVEN" && "bg-slate-700"
                } p-4 items-center rounded-md`
              : `flex justify-between items-center ${
                  outcome === "WIN" && "bg-green-400"
                } ${outcome === "LOSS" && "bg-red-400"} ${
                  outcome === "BREAK EVEN" && "bg-slate-300"
                } p-4 items-center rounded-md`
          }
        >
          <div className="flex gap-3 items-center">
            <p className="font-semibold text-xl">{pair}</p>
            <p>{outcome}</p>
          </div>
          <p className="uppercase">{dayjs(date).format("d MMM YYYY")}</p>
        </div>

        <div className="p-5">
          <div className="mb-6">
            {isLoading ? (
              <Skeleton variant="rounded" width={"100%"} height={400} />
            ) : (
              <div className="flex min-h-[300px]">
                <img src={image} alt="trade" />
              </div>
            )}
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
                  WebkitTextFillColor: isDarkMode ? "#f1f5f9" : "#37474f",
                },
                "& .MuiInputBase-root.Mui-disabled": {
                  "& > fieldset": {
                    borderColor: isDarkMode && "#4f5460",
                  },
                },
                "& .MuiFormLabel-root.Mui-disabled": {
                  color: isDarkMode && "#f1f5f9",
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
                  WebkitTextFillColor: isDarkMode ? "#f1f5f9" : "#37474f",
                },
                "& .MuiInputBase-root.Mui-disabled": {
                  "& > fieldset": {
                    borderColor: isDarkMode && "#4f5460",
                  },
                },
                "& .MuiFormLabel-root.Mui-disabled": {
                  color: isDarkMode && "#f1f5f9",
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
                  WebkitTextFillColor: isDarkMode ? "#f1f5f9" : "#37474f",
                },
                "& .MuiInputBase-root.Mui-disabled": {
                  "& > fieldset": {
                    borderColor: isDarkMode && "#4f5460",
                  },
                },
                "& .MuiFormLabel-root.Mui-disabled": {
                  color: isDarkMode && "#f1f5f9",
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
                    WebkitTextFillColor: isDarkMode ? "#f1f5f9" : "#37474f",
                  },
                  "& .MuiInputBase-root.Mui-disabled": {
                    "& > fieldset": {
                      borderColor: isDarkMode && "#4f5460",
                    },
                  },
                  "& .MuiFormLabel-root.Mui-disabled": {
                    color: isDarkMode && "#f1f5f9",
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
                    WebkitTextFillColor: isDarkMode ? "#f1f5f9" : "#37474f",
                  },
                  "& .MuiInputBase-root.Mui-disabled": {
                    "& > fieldset": {
                      borderColor: isDarkMode && "#4f5460",
                    },
                  },
                  "& .MuiFormLabel-root.Mui-disabled": {
                    color: isDarkMode && "#f1f5f9",
                  },
                }}
              />
            </div>
          )}
        </div>

        <div
          className={
            isDarkMode
              ? `flex justify-between items-center ${
                  outcome === "WIN" && "bg-green-700"
                } ${outcome === "LOSS" && "bg-red-700"} ${
                  outcome === "BREAK EVEN" && "bg-slate-700"
                } p-4 items-center rounded-md`
              : `flex justify-between items-center ${
                  outcome === "WIN" && "bg-green-400"
                } ${outcome === "LOSS" && "bg-red-400"} ${
                  outcome === "BREAK EVEN" && "bg-slate-300"
                } p-4 rounded-md`
          }
        >
          <p className="font-semibold text-xl">Total profit:</p>
          <p className="font-semibold text-xl">{formatCurrency(profit)}</p>
        </div>
      </div>
    </>
  );
}

export default TradeDetail;
