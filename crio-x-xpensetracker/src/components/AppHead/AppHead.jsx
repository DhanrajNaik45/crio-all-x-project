import "./AppHead.css";
import PieChartComp from "../PieChart/PieChart";
import Card from "../Card/Card";

const AppHead = (props) => {
  const { balance, expenses } = props;
  return (
    <header className="AppHead">
      <Card text="Wallet Balance" value={balance} />
      <Card text="Expenses" value={expenses} />
      <PieChartComp />
    </header>
  );
};

export default AppHead;
