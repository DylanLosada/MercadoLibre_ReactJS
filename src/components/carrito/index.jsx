import { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import CarritoCard from "./carritoCard";
import CarritoCounter from "./carritoCounter";
import plusCarritoPrices from "../../modules/plusCarritoPrices";
import { priceProduct } from "../../modules/priceProduct";

const Carrito = () => {
  const {
    carrito,
    addQuantity,
    lessQuantity,
    setQuantity,
    deleteProduct,
  } = useContext(GlobalContext);

  const [totalPrice, setTotalPrice] = useState();

  useEffect(() => {
    setTotalPrice(plusCarritoPrices(carrito));
  }, [carrito]);

  return (
    <section className="section">
      <div className="carritoContainer">
        <div className="carritoContainer__titleContainer">
          <div className="carritoContainer__titleContainer-div">
            <h2 className="carritoContainer__titleContainer-div-title">
              Carrito
            </h2>
          </div>
        </div>
        {carrito.length > 0 ? (
          <div className="w-100">
            <ul className="w-100">
              {carrito.map((producto) => (
                <li key={producto.id} className="w-100">
                  <CarritoCard
                    producto={producto}
                    carrito={carrito}
                    lessQuantity={lessQuantity}
                    addQuantity={addQuantity}
                    setQuantity={setQuantity}
                    deleteProduct={deleteProduct}
                    priceProduct={priceProduct}
                  />
                </li>
              ))}
            </ul>

            <CarritoCounter
              totalPrice={totalPrice}
              priceProduct={priceProduct}
            />
          </div>
        ) : (
          <div className="carritoContainer__empty">
            <h1 className="carritoContainer__empty-title">
              Tu carrito está vacío
            </h1>
          </div>
        )}
      </div>
    </section>
  );
};

export default Carrito;
