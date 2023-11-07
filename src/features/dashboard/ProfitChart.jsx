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

const colors = {
  profit: { stroke: "#4f46e5", fill: "#c7d2fe" },
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

function ProfitChart({ userTrades }) {
  const dates = userTrades.map((trade) => dayjs(trade.date));

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
        .reduce((acc, cur) => (currentBalance += cur.profit), currentBalance),
    };
  });

  return (
    <div className="border mt-5 p-4">
      <h2 className="mb-3 font-semibold">Equity growth</h2>

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
          />
          <CartesianGrid strokeDasharray="1" />
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
