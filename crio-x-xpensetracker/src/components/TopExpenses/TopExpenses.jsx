import TopExpenseBody from "../TopExpenseBody/TopExpenseBody";
import "../Transactions/Transactions.css";

const TopExpenses = () => {
  return (
    <div className="Transactions">
      <h2>Top Expenses</h2>
      <TopExpenseBody />
    </div>
  );
};

export default TopExpenses;
