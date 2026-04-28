import React, { useContext, useEffect, useState } from "react";
import { MoneyContext, TransactionsContext } from "../../Contexts/AllContexts";
import FormButtons from "../FormButtons/FormButtons";

const ModalForm = (props) => {
  //props
  const { toggleModal, formType, existingData } = props;
  const [transactionData, setTransactionData] = useContext(TransactionsContext);
  const [money, setMoney] = useContext(MoneyContext);
  useEffect(() => {
    if (existingData) updateFormDataWithExistingData();
  }, []);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    date: new Date().toISOString().split("T")[0], //gives date in yyyy-mm-dd format
  });
  const [balanceFormData, setBalanceFormData] = useState({ income: "" });
  //functions
  const updateFormDataWithExistingData = () => {
    console.log(existingData);
    const { name, date, amount, category } = existingData;
    setFormData({
      name: name,
      price: amount,
      category: category,
      date: date,
    });
  };
  const handleChange = (evt) => {
    const fieldName = evt.target.name === "title" ? "name" : evt.target.name;
    const value = evt.target.value;
    setFormData({ ...formData, [fieldName]: value });
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (formType === "Add Balance") {
      setMoney({
        ...money,
        balance: money.balance + balanceFormData.income,
      });
    }
    if (formType === "Add Expense") {
      let newExpense = money.expenses + Number(formData.price);
      let newBalance = money.balance - Number(formData.price);

      if (newBalance < 0) {
        return alert("Out of balance");
      } else {
        let newId = new Date() / 1;
        let newTransaction = { ...formData, id: newId };
        setMoney({ balance: newBalance, expenses: newExpense });
        setTransactionData([newTransaction, ...transactionData]);
      }
    }
    if (formType === "Edit Expense") {
      let newExpense =
        money.expenses + Number(formData.price) - Number(existingData.amount);
      let newBalance =
        money.balance - Number(formData.price) + Number(existingData.amount);

      if (newBalance < 0) return alert("Out of balance");

      //get index of transaction
      const indexOfTransaction = transactionData.findIndex(
        (transaction) => existingData.id === transaction.id,
      );
      //store transaction data in new variable
      const updatedTransaction = { ...formData, id: existingData.id };
      //add that new tranaction at that index with same id
      transactionData[indexOfTransaction] = updatedTransaction;

      setMoney({ balance: newBalance, expenses: newExpense });
      setTransactionData([...transactionData]);
    }

    toggleModal();
  };

  const expenseAndEditInput = () => {
    return (
      <div className="formInputsDiv">
        <input
          required
          value={formData.name}
          className="formInput"
          onChange={handleChange}
          type="text"
          name="title"
          autoFocus
          placeholder="Title"
        />
        <input
          value={formData.price}
          required
          className="formInput"
          onChange={handleChange}
          placeholder="Price"
          type="number"
          name="price"
        />
        <select
          value={formData.category}
          onChange={handleChange}
          className="formInput"
          placeholder="Select Category"
          name="category"
        >
          <option value={null}>Select Category</option>
          <option value="food">Food</option>
          <option value="entertainment">Entertainment</option>
          <option value="travel">Travel</option>
        </select>
        <input
          value={formData.date}
          required
          className="formInput"
          onChange={handleChange}
          placeholder="dd/mm/yyyy"
          type="date"
          name="date"
        />
      </div>
    );
  };
  const incomeInputs = () => {
    return (
      <div className="balanceFormInputDiv">
        <input
          className="formInput"
          onChange={(e) => setBalanceFormData({ income: +e.target.value })}
          autoFocus
          required
          placeholder="Income Amount"
          type="number"
          name="income"
          value={balanceFormData.income}
        />
      </div>
    );
  };
  return (
    <form className="modalForm expensesForm" onSubmit={handleSubmit}>
      {formType === "Add Balance" ? incomeInputs() : expenseAndEditInput()}
      <FormButtons text={formType} toggleModal={toggleModal} />
    </form>
  );
};

export default ModalForm;
