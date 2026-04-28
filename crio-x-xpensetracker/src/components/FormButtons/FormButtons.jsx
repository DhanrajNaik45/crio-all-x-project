import "../Modal/Modal.css";
import Button from "../Button/Button";

const FormButtons = (props) => {
  const { text, toggleModal } = props;
  return (
    <div className="formButtons">
      <Button
        text={text}
        buttonType="submit"
        background="backgroundOrange"
        buttonSize="largeButton"
      />
      <Button
        text="Cancel"
        buttonSize="largeButton"
        background="backgroundWhite"
        clickFunction={toggleModal}
      />
    </div>
  );
};

export default FormButtons;
