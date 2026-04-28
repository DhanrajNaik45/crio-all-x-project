import "./Button.css";

const Button = (props) => {
  const { text, background, buttonSize, icon, clickFunction, buttonType } =
    props;
  return (
    <button
      className={`Button ${buttonSize} ${background}`}
      onClick={clickFunction}
      type={buttonType}
    >
      {text || <img src={icon} />}
    </button>
  );
};

export default Button;
