import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

const CarritoCard = ({
  producto,
  carrito,
  lessQuantity,
  addQuantity,
  deleteProduct,
  priceProduct,
}) => {
  return (
    <>
      {producto ? (
        <Card className="cardSearch carritoCard">
          <div className="cardSearch__cards">
            <Link
              to={`/producto/${producto.id}`}
              className="cardSearch__cards-containerImg"
            >
              <Card.Img
                className="cardSearch__cards-containerImg-img img-fluid"
                variant="top"
                src={producto.img}
              />
            </Link>
            <Card.Body className="cardSearch__cards-body">
              <NavLink
                to={`/producto/${producto.id}`}
                className="cardSearch__cards-body-name"
              >
                {producto.name}
              </NavLink>
              {producto.old_price ? (
                <Card.Subtitle className="cardSearch__cards-body-priceBefore">
                  $ {producto.old_price}{" "}
                </Card.Subtitle>
              ) : null}
              <Card.Text className="cardSearch__cards-body-price">
                <span>$</span>
                <span>{priceProduct(producto.price)}</span>
                {producto.off ? (
                  <span className="cardSearch__cards-body-price-off">
                    {producto.off}% OFF
                  </span>
                ) : null}
              </Card.Text>

              {/* { item.installments ? item.installments.quantity <= 9 && item.installments.rate === 0 ? <div> <p className = 'cardSearch__cards-body-info-shippingFree'>Hasta {item.installments.quantity} cuotas sin interés</p> </div> : null  : null} */}

              {/* <div className = 'cardSearch__cards-body-info'>
                                <Card.Subtitle className = 'cardSearch__cards-body-info-state'>{ item.condition }</Card.Subtitle>
                                {(item.shipping.logistic_type === 'fulfillment') ? <Badge className = 'cardSearch__cards-body-info-shippingFull'>Llega gratis mañana</Badge> : null}
                                {(item.shipping.free_shipping === false && !item.shipping.logistic_type === 'fulfillment') ? <p className = 'cardSearch__cards-body-info-shippingFree'>Envío gratis</p> : null}
                            </div> */}
            </Card.Body>
            <div className="carritoCardContainer">
              <div className="carritoCard__counter">
                <Button
                  className="carritoCard__counter-button"
                  disabled={producto.quantity === 1 ? true : false}
                  onClick={(e) => lessQuantity(producto.id)}
                >
                  -
                </Button>
                <b className="carritoCard__counter-display">
                  {carrito.map((quantity) => {
                    return quantity.id === producto.id
                      ? quantity.quantity
                      : null;
                  })}
                </b>
                <Button
                  className="carritoCard__counter-button"
                  onClick={(e) => addQuantity(producto.id, producto.stock)}
                >
                  +
                </Button>
              </div>

              <div className="carritoCard__delete">
                <Button
                  className="carritoCard__delete-button"
                  onClick={() => deleteProduct(producto.id)}
                >
                  Eliminar
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ) : null}
    </>
  );
};

export default CarritoCard;
