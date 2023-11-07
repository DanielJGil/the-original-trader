import {
  BsCurrencyDollar,
  BsFileEarmarkBarGraph,
  BsGraphUp,
} from "react-icons/bs";
import Stat from "./Stat";
import { useSettings } from "../settings/useSettings";
import { formatCurrency } from "../../utils/helpers";
import Spinner from "../../ui/Spinner";
import { PercentOutlined } from "@mui/icons-material";

function Stats({ userTrades, numTrades }) {
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
  const winRate =
    numWinningTrades && numTrades ? (numWinningTrades / numTrades) * 100 : 0;

  return (
    <div className="flex gap-6 flex-wrap justify-between">
      <Stat
        title="Profit"
        textColor="text-blue-800"
        bgColor="bg-blue-100"
        icon={<PercentOutlined />}
        value={profitInPercentage.toFixed(2) + "%"}
      />
      <Stat
        title="Balance"
        textColor="text-green-800"
        bgColor="bg-green-100"
        icon={<BsCurrencyDollar />}
        value={formatCurrency(balance)}
      />
      <Stat
        title="Trades"
        textColor="text-indigo-800"
        bgColor="bg-indigo-100"
        icon={<BsFileEarmarkBarGraph />}
        value={numTrades}
      />
      <Stat
        title="Win rate"
        textColor="text-yellow-800"
        bgColor="bg-yellow-100"
        icon={<BsGraphUp />}
        value={winRate.toFixed(2) + "%"}
      />
    </div>
  );
}

export default Stats;
