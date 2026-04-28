import { useEffect, useRef, useState } from "react";
//styles
import "./App.css";
//components
import AppHead from "./components/AppHead/AppHead";
import AppBody from "./components/AppBody/AppBody";
//contexts
import { TransactionsContext, MoneyContext } from "./Contexts/AllContexts";
//variables
import { dummyData } from "./dummyTransactions";

const defaultMoney = {
  balance: 5000,
  expenses: dummyData.reduce(
    (total, transaction) => total + Number(transaction.price),
    0,
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
    // save data to local storage after initial load
    if (!initialRender.current) {
      localStorage.setItem(
        "allData",
        JSON.stringify({ money, transactionData }),
      );
      localStorage.setItem("expenses", JSON.stringify(transactionData));
    }
  }, [money, transactionData]);

  //functions
  const onLoad = () => {
    //load data from local storage if present
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
          0,
        );
        setMoney({ balance: defaultMoney.balance, expenses: expensesTotal });
        setTransactionData(parsedData);
      }
    }
  };

  return (
    <main className="App">
      <MoneyContext.Provider value={[money, setMoney]}>
        <TransactionsContext.Provider
          value={[transactionData, setTransactionData]}
        >
          <nav>
            <h1>Expense Tracker</h1>
          </nav>
          <AppHead balance={money.balance} expenses={money.expenses} />
          <AppBody transactionData={transactionData} />
        </TransactionsContext.Provider>
      </MoneyContext.Provider>
    </main>
  );
}

export default App;
