import {
  BsCurrencyDollar,
  BsFileEarmarkBarGraph,
  BsGraphUp,
} from "react-icons/bs";
import Stat from "./Stat";
import { useSettings } from "../settings/useSettings";
import { formatCurrency } from "../../utils/helpers";
import Spinner from "../../ui/Spinner";
import {
  EqualizerOutlined,
  PercentOutlined,
  TrendingUpOutlined,
} from "@mui/icons-material";
import { useDarkMode } from "../../context/DarkModeContext";
import { Skeleton } from "@mui/material";

function Stats({ userTrades, numTrades }) {
  const { isDarkMode } = useDarkMode();

  // Account balance
  const { settings, isLoading } = useSettings();
  if (isLoading)
    return (
      <div className="w-full flex flex-col md:flex-row gap-6">
        <Skeleton variant="rounded" width={"100%"} height={80} />
        <Skeleton variant="rounded" width={"100%"} height={80} />
        <Skeleton variant="rounded" width={"100%"} height={80} />
        <Skeleton variant="rounded" width={"100%"} height={80} />
      </div>
    );
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
    <div className="w-full flex gap-6 flex-wrap justify-between">
      <Stat
        title="Profit"
        textColor={isDarkMode ? "text-slate-100" : "text-blue-800"}
        bgColor={isDarkMode ? "bg-blue-800" : "bg-blue-100"}
        icon={<PercentOutlined fontSize="inherit" />}
        value={profitInPercentage.toFixed(2) + "%"}
      />
      <Stat
        title="Balance"
        textColor={isDarkMode ? "text-slate-100" : "text-green-800"}
        bgColor={isDarkMode ? "bg-green-800" : "bg-green-100"}
        icon={<BsCurrencyDollar />}
        value={formatCurrency(balance)}
      />

      <Stat
        title="Trades"
        textColor={isDarkMode ? "text-slate-100" : "text-indigo-800"}
        bgColor={isDarkMode ? "bg-indigo-800" : "bg-indigo-100"}
        icon={<EqualizerOutlined fontSize="large" />}
        value={numTrades}
      />
      <Stat
        title="Win rate"
        textColor={isDarkMode ? "text-slate-100" : "text-yellow-800"}
        bgColor={isDarkMode ? "bg-yellow-700" : "bg-yellow-100"}
        icon={<TrendingUpOutlined fontSize="large" />}
        value={winRate.toFixed(2) + "%"}
      />
    </div>
  );
}

export default Stats;
