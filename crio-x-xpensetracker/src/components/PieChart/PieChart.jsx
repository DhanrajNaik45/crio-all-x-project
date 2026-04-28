import "./PieChart.css";
import useChartData from "../customHooks/useChartData";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const CHARTLABELS = [
  {
    color: "#A000FF",
    name: "Entertainment",
  },
  {
    color: "#FF9304",
    name: "Food",
  },
  {
    color: "#FDE006",
    name: "Travel",
  },
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const PieChartComp = () => {
  //hooks
  const chartData = useChartData([
    { name: "Entertainment", value: 0 },
    { name: "Food", value: 0 },
    { name: "Travel", value: 0 },
  ]);

  return (
    <div className="pieChart">
      <div className="pie">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={400}>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={99}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={CHARTLABELS[index % CHARTLABELS.length].color}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="pieLabelsDiv">
        {CHARTLABELS.map((item) => {
          return (
            <div className="pieLabel">
              <span
                className="labelColorBar"
                style={{ backgroundColor: item.color }}
              ></span>
              <span className="labelText">{item.name}</span>
            </div>
          );
        })}
        
      </div>
    </div>
  );
};

export default PieChartComp;
