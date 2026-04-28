import { useContext, useState } from "react";
import { MoneyContext } from "../../Contexts/AllContexts";

function AppHead() {
    const [money, setMoney] = useContext(MoneyContext);
    const [income, setIncome] = useState("");

    function addIncome() {
        if (!income) return;
        setMoney({ ...money, balance: money.balance + Number(income) });
        setIncome("");
    }

    return (
        <div>
            <div>
                <h2>Wallet Balance: ₹{money.balance}</h2>
                <input
                    placeholder="Income Amount"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                />
                <button onClick={addIncome}>+ Add Income</button>
            </div>

            <div>
                <h2>Expenses: ₹{money.expenses}</h2>
            </div>
        </div>
    );
}

export default AppHead;