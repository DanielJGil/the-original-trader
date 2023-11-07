import { format, isSameDay, subDays } from "date-fns";
import { eachDayOfInterval } from "date-fns/esm";
import { useSearchParams } from "react-router-dom";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useSettings } from "../settings/useSettings";
import Spinner from "../../ui/Spinner";

const colors = {
  totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
  extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
  text: "#374151",
  background: "#fff",
};

// const colors = isDarkMode
// ? {
//     profit: { stroke: "#4f46e5", fill: "#4f46e5" },
//     text: "#e5e7eb",
//     background: "#18212f",
//   }
// : {
//     profit: { stroke: "#4f46e5", fill: "#c7d2fe" },
//     text: "#374151",
//     background: "#fff",
//   };

function ProfitChart({ userTrades, numTrades }) {
  const [searchParams] = useSearchParams();

  const { settings, isLoading } = useSettings();
  if (isLoading) return <Spinner />;
  const { accountSize } = settings;

  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  let startingBalance = accountSize;

  const data = allDates.map((date) => {
    return {
      label: format(date, "MMM dd"),
      profit: userTrades
        .filter((trade) => isSameDay(date, new Date(trade.date)))
        .reduce((acc, cur) => (startingBalance += cur.profit), startingBalance),
    };
  });

  const drawdown = accountSize * 0.98;

  return (
    <div className="border mt-5 p-4">
      <h2 className="mb-3 font-semibold">Equity growth</h2>

      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            domain={[drawdown, 11000]}
            unit="$"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip />
          {/* <Tooltip contentStyle={{ backgroundColor: colors.background }} /> */}
          <Area
            dataKey="profit"
            type="monotone"
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            name="Total profit"
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ProfitChart;
