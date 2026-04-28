import React, { useState } from "react";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import "./Card.css";

const Card = (props) => {
  const [modalOn, setModalOn] = useState(false);
  const { text, value } = props;
  //functions
  const toggleModal = () => setModalOn(!modalOn);

  return (
    <div className="card">
      <span className="cardText">
        <span>{text}: </span>
        <span className={text === "Expenses" ? "cardTextRed" : "cardTextGreen"}>
          ₹{value}
        </span>
      </span>
      <Button
        text={text === "Expenses" ? "+ Add Expense" : "+ Add Income"}
        background={text === "Expenses" ? "gradientRed" : "gradientGreen"}
        buttonSize="largeButton"
        clickFunction={toggleModal}
      />
      {modalOn ? (
        <Modal
          text={text === "Expenses" ? "Add Expense" : "Add Balance"}
          toggleModal={toggleModal}
        />
      ) : null}
    </div>
  );
};

export default Card;
