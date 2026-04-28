
import TransactionsBody from "../TransactionsBody/TransactionsBody";
import "./Transactions.css";

const Transactions = () => {
  return (
    <div className="Transactions">
      <h2>Recent Transactions</h2>
      <TransactionsBody />
    </div>
  );
};

export default Transactions;
