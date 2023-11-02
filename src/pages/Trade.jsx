import { Button } from "@mui/material";
import TradeDetail from "../features/trades/TradeDetail";
import { useNavigate } from "react-router-dom";

function Trade() {
  const navigate = useNavigate();

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

      <div>
        <TradeDetail />
      </div>
    </>
  );
}

export default Trade;
