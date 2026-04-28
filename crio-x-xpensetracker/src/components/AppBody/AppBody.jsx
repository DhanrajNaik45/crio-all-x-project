import { useContext, useState } from "react";
import { MoneyContext, TransactionsContext } from "../../Contexts/AllContexts";

function AppBody() {
    const [transactionData, setTransactionData] = useContext(TransactionsContext);
    const [money, setMoney] = useContext(MoneyContext);

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("food");
    const [date, setDate] = useState("");

    function addExpense() {
        if (!title || !price || !date) return;

        const newExpense = {
            id: Date.now(),
            name: title,
            title: title,
            price: Number(price),
            category,
            date,
        };

        setTransactionData([...transactionData, newExpense]);
        setMoney({
            balance: money.balance - Number(price),
            expenses: money.expenses + Number(price),
        });

        setTitle("");
        setPrice("");
        setCategory("food");
        setDate("");
    }

    return (
        <div>
            <h2>Recent Transactions</h2>

            <input
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <input
                placeholder="Price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />

            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="food">food</option>
                <option value="travel">travel</option>
                <option value="entertainment">entertainment</option>
            </select>

            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />

            <button onClick={addExpense}>+ Add Expense</button>

            {transactionData.map((item) => (
                <div key={item.id}>
                    <p>{item.name || item.title}</p>
                    <p>₹{item.price}</p>
                    <p>{item.category}</p>
                </div>
            ))}
        </div>
    );
}

export default AppBody;