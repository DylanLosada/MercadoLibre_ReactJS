import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { priceProduct } from "../../../modules/priceProduct";

const CardsMisCompras = ({ product, date, idProduct, index }) => {
  console.log(product);
  return (
    <div className="w-100 mb-4 cardMisCompras">
      <div className="finishBuy__cardShipping-header cardMisComprasInfo__infoContainer d-flex justify-content-between">
        <h2 className="finishBuy__package-name cardMisComprasInfo__infoContainer-title">
          Paquete {index}
        </h2>
        <div>
          <h5>Fecha de compra: {date}</h5>
          <h5>ID compra: {idProduct}</h5>
          <h3>
            Total: ${" "}
            {priceProduct(
              String(
                product.reduce((prev, newValue) => prev + newValue.price, 0)
              ).trim()
            )}
          </h3>
        </div>
      </div>

      <div className="finishBuy__cardShipping row mr-0 ml-0 justify-content-start align-items-center w-100">
        {product.map((item) => (
          <Card className="cardMisComprasProduct">
            <Link
              to={`/producto/${item.id}`}
              className="cardMisComprasProduct__link"
            >
              <Card.Body className="finishBuy__cardShipping-body cardMisComprasProduct__link-body">
                <div className="finishBuy__cardShipping-body-imgContainer cardMisComprasProduct__link-body-imgContainer">
                  <img
                    className="finishBuy__cardShipping-body-imgContainer-img img-fluid cardMisComprasProduct__link-body-imgContainer-img"
                    src={item.img}
                    alt="Producto"
                  />
                </div>
              </Card.Body>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CardsMisCompras;
