import { useEffect, useRef, useState } from "react";
import "./App.css";
import { dummyData } from "./dummyTransactions";

const defaultMoney = {
  balance: 5000,
  expenses: dummyData.reduce(
    (total, transaction) => total + Number(transaction.price),
    0
  ),
};

function App() {
  const [money, setMoney] = useState(defaultMoney);
  const [transactionData, setTransactionData] = useState(dummyData);
  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      onLoad();
      initialRender.current = false;
    }
  }, []);

  useEffect(() => {
    if (!initialRender.current) {
      localStorage.setItem(
        "allData",
        JSON.stringify({ money, transactionData })
      );
      localStorage.setItem("expenses", JSON.stringify(transactionData));
    }
  }, [money, transactionData]);

  const onLoad = () => {
    const storedData =
      localStorage.getItem("allData") || localStorage.getItem("expenses");

    if (storedData) {
      const parsedData = JSON.parse(storedData);

      if (parsedData && parsedData.money && parsedData.transactionData) {
        setMoney(parsedData.money);
        setTransactionData(parsedData.transactionData);
      } else if (Array.isArray(parsedData)) {
        const expensesTotal = parsedData.reduce(
          (total, transaction) => total + Number(transaction.price),
          0
        );
        setMoney({ balance: defaultMoney.balance, expenses: expensesTotal });
        setTransactionData(parsedData);
      }
    }
  };

  return (
    <main className="App">
      <nav>
        <h1>Expense Tracker</h1>
      </nav>

      <h2>Balance: ₹{money.balance}</h2>
      <h2>Expenses: ₹{money.expenses}</h2>

      {transactionData.map((item, index) => (
        <p key={index}>
          {item.title} - ₹{item.price}
        </p>
      ))}
    </main>
  );
}

export default App;