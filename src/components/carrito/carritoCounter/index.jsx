import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const CarritoCounter = ({ totalPrice }) => (
  <div className="carritoCounter">
    <div className="carritoCounter__container">
      <div className="carritoCounter__container-shipping">
        Envío <span></span>
      </div>

      <div className="carritoCounter__container-cost">
        <p>Total con envío</p>
        <span>$ {totalPrice}</span>
      </div>
    </div>

    <div className="carritoCounter__button">
      <Link to={"/finish-buy"} className="d-block">
        <Button className="carritoCounter__button-buy">Continuar compra</Button>
      </Link>
    </div>
  </div>
);

export default CarritoCounter;
