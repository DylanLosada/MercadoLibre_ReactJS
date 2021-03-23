import { Button, Link } from "react-bootstrap";

const BuyButton = ({ handleUserAdress }) => {
  return (
    <div className="finishBuy__buttonContainer">
      <Button
        className="finishBuy__buttonContainer-button"
        onClick={() => handleUserAdress()}
      >
        Continuar
      </Button>
    </div>
  );
};

export default BuyButton;
