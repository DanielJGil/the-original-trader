import {
  BsCurrencyDollar,
  BsFileEarmarkBarGraph,
  BsGraphUpArrow,
} from "react-icons/bs";
import Stat from "./Stat";
import { useSettings } from "../settings/useSettings";
import { formatCurrency } from "../../utils/helpers";
import Spinner from "../../ui/Spinner";
import { PercentOutlined } from "@mui/icons-material";

function Stats({ userTrades }) {
  // Number of trades taken
  const numTrades = userTrades.length;

  // Account balance
  const { settings, isLoading } = useSettings();
  if (isLoading) return <Spinner />;
  const { accountSize } = settings;

  const balance = userTrades?.reduce(
    (acc, cur) => acc + cur.profit,
    accountSize
  );

  // Account profit in percentage
  const accountPercent = accountSize / 100;
  const accountProfit = userTrades?.reduce((acc, cur) => acc + cur.profit, 0);
  const profitInPercentage = accountProfit / accountPercent;

  // Win rate
  const winningTrades = userTrades?.filter((trade) => trade.outcome === "WIN");
  const numWinningTrades = winningTrades.length;
  const winRate = (numWinningTrades / numTrades) * 100;

  return (
    <div className="flex gap-6 flex-wrap">
      <Stat
        title="Profit"
        color="blue"
        icon={<PercentOutlined />}
        value={profitInPercentage.toFixed(2)}
      />
      <Stat
        title="Balance"
        color="green"
        icon={<BsCurrencyDollar />}
        value={formatCurrency(balance)}
      />
      <Stat
        title="Trades"
        color="indigo"
        icon={<BsFileEarmarkBarGraph />}
        value={numTrades}
      />
      <Stat
        title="Win rate"
        color="yellow"
        icon={<BsFileEarmarkBarGraph />}
        value={winRate.toFixed(2)}
      />
    </div>
  );
}

export default Stats;
