import { Button } from "@mui/material";
import TradeTable from "../features/trades/TradeTable";
import { useNavigate } from "react-router-dom";

function Trades() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-between mb-5">
        <h1 className="font-semibold text-xl">Trades</h1>
        <Button
          size="small"
          variant="contained"
          onClick={() => navigate("new")}
        >
          Add new trade
        </Button>
      </div>

      <div>
        <TradeTable />
      </div>
    </>
  );
}

export default Trades;
