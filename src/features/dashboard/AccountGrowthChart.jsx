import { format, isSameDay, subDays } from "date-fns";
import { eachDayOfInterval } from "date-fns/esm";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import dayjs from "dayjs";
import { useDarkMode } from "../../context/DarkModeContext";
import { useSettings } from "../settings/useSettings";

function ProfitChart({ userTrades }) {
  const { isDarkMode } = useDarkMode();
  const border = !isDarkMode ? "border" : "";
  const background = isDarkMode ? "bg-[#18212f]" : "bg-[#fff]";

  const dates = userTrades?.map((trade) => dayjs(trade.date));

  const { settings = {} } = useSettings();
  const { accountSize } = settings;

  const balanceAfterTrade = [];
  let accountBalance = accountSize;
  userTrades?.reduce(
    (acc, cur) => balanceAfterTrade.push((accountBalance += cur.profit)),
    accountBalance
  );

  const lowestDataValue = accountSize - Math.min(...balanceAfterTrade);
  const highestDataValue = Math.max(...balanceAfterTrade) - accountSize;

  let startDate = dates[0];
  for (let i = 0; i < dates.length; i++) {
    if (dates[i] < startDate) startDate = dates[i];
  }

  const endDate = dayjs(new Date());
  const numDays = endDate.diff(startDate, "day");

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays + 1),
    end: new Date(),
  });

  let currentBalance = 0;

  const data = allDates.map((date) => {
    return {
      label: format(date, "MMM dd"),
      profit: userTrades
        .filter((trade) => isSameDay(date, new Date(trade.date)))
        .reduce((acc, cur) => (currentBalance += cur.profit), currentBalance)
        .toFixed(2),
    };
  });

  const colors = isDarkMode
    ? {
        profit: { stroke: "#4f46e5", fill: "#4f46e5" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        profit: { stroke: "#4f46e5", fill: "#c7d2fe" },
        text: "#374151",
        background: "#fff",
      };

  return (
    <div className={`${border} ${background} mt-5 p-4 rounded-md`}>
      <h2 className="mb-3 font-semibold">
        Account growth from {startDate?.format("D MMM YYYY")} &mdash;{" "}
        {endDate.format("D MMM YYYY")}
      </h2>

      <ResponsiveContainer height={400} width="100%">
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
            interval={4}
          />
          <YAxis
            unit="$"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
            tickCount={12}
            domain={[
              Math.ceil(-lowestDataValue / 100) * 100 - 50,
              Math.ceil(highestDataValue / 500) * 500,
            ]}
            tickFormatter={(value) => value.toFixed()}
          />
          <CartesianGrid strokeDasharray="4" opacity={isDarkMode ? 0.1 : 0.5} />
          <Tooltip />
          <Area
            dataKey="profit"
            type="monotone"
            stroke={colors.profit.stroke}
            fill={colors.profit.fill}
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
