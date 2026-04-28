import "../TransactionsBody/TransactionsBody.css";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import useChartData from "../customHooks/useChartData";

const TopExpenseBody = () => {
  const chartData = useChartData([
    { name: "food", value: 0 },
    { name: "entertainment", value: 0 },
    { name: "travel", value: 0 },
  ]);

  //functions
  const showSortedData = () => {
    return chartData.sort((a, b) => b.value - a.value);
  };

  return (
    <div
      className="TopExpensesBody"
      onClick={showSortedData}
      style={{ height: "100px" }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={showSortedData()} layout="vertical" barSize={30}>
          <XAxis type="number" hide />
          <YAxis type="category" width={120} dataKey="name" />
          <Bar dataKey="value" fill="#8784D2" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopExpenseBody;
