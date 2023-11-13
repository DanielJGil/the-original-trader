import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";

function OutcomeChart({ userTrades }) {
  const { isDarkMode } = useDarkMode();
  const border = !isDarkMode ? "border" : "";
  const background = isDarkMode ? "bg-[#18212f]" : "";

  let win = 0;
  let loss = 0;
  let breakEven = 0;

  userTrades?.map((trade) => trade.outcome === "WIN" && win++);
  userTrades?.map((trade) => trade.outcome === "LOSS" && loss++);
  userTrades?.map((trade) => trade.outcome === "BREAK EVEN" && breakEven++);

  const data = [
    {
      outcome: "WIN",
      value: win,
      color: isDarkMode ? "#15803d" : "#22c55e",
    },
    {
      outcome: "LOSS",
      value: loss,
      color: isDarkMode ? "#b91c1c" : "#ef4444",
    },
    {
      outcome: "BREAK EVEN",
      value: breakEven,
      color: isDarkMode ? "#1d4ed8" : "#3b82f6",
    },
  ];

  if (!win && !loss && !breakEven)
    return (
      <div
        className={`p-4 h-[20rem] w-full flex items-center justify-center ${border} rounded-md ${background} `}
      >
        <p className="font-semibold text-lg">
          You do not have any trade data yet...
        </p>
      </div>
    );

  return (
    <div
      className={`p-4 h-[20rem] xl:w-[97%] w-full min-w-[300px] ${border} rounded-md ${background} `}
    >
      <h2 className="font-semibold">Outcome summary</h2>

      <ResponsiveContainer width="100%">
        <PieChart>
          <Pie
            data={data}
            nameKey="outcome"
            dataKey="value"
            innerRadius={85}
            outerRadius={110}
            cx="40%"
            cy="45%"
            paddingAngle={3}
          >
            {data.map((entry) => (
              <Cell
                fill={entry.color}
                stroke={entry.color}
                key={entry.outcome}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="middle"
            align="right"
            width="30%"
            layout="verical"
            iconSize={15}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default OutcomeChart;
