import { Button } from "@mui/material";
import TradeTable from "../features/trades/TradeTable";

function Trades() {
  return (
    <>
      <div className="flex justify-between mb-5">
        <h1 className="font-semibold text-xl">Trades</h1>
        <Button size="small" variant="contained">
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
