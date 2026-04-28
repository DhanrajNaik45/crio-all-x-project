
import "./Modal.css";
import ModalForm from "./ModalForm";

const Modal = (props) => {
  const { toggleModal, text, existingData } = props;

  return (
    <div className="Modal" onClick={toggleModal}>
      <div className="modalBody" onClick={(e) => e.stopPropagation()}>
        <div className="modalHead">{text}</div>
        <ModalForm
          existingData={existingData}
          formType={text}
          toggleModal={toggleModal}
        />
      </div>
    </div>
  );
};

export default Modal;
