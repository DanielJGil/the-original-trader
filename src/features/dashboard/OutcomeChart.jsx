import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

function OutcomeChart({ userTrades }) {
  let win = 0;
  let loss = 0;
  let breakEven = 0;

  userTrades.map((trade) => trade.outcome === "WIN" && win++);
  userTrades.map((trade) => trade.outcome === "LOSS" && loss++);
  userTrades.map((trade) => trade.outcome === "BREAK EVEN" && breakEven++);

  const data = [
    {
      outcome: "WIN",
      value: win,
      color: "#22c55e",
    },
    {
      outcome: "LOSS",
      value: loss,
      color: "#ef4444",
    },
    {
      outcome: "BREAK EVEN",
      value: breakEven,
      color: "#b348ff",
    },
  ];

  return (
    <div className="p-4 h-[20rem] w-full border rounded-md">
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
