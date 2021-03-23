import SummaryBuy from "./summaryBuy";
import BuyButton from "./buyButton";
import ContainerPackageProduct from "./containerPackageProduct";
import ShippingAdress from "./shippingAdress";

import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import plusCarritoPrices from "../../modules/plusCarritoPrices";
import getDateShipping from "../../modules/getDateShipping";
import { UserLogin } from "../../context/UserLoginContext";
import { Alert } from "react-bootstrap";
import { MisComprasContext } from "../../context/MisComprasContext";

const FinishBuy = () => {
  const { carrito } = useContext(GlobalContext);
  const { user, userAdress } = useContext(UserLogin);
  const { setDeleteCarrito } = useContext(MisComprasContext);

  const [finishBuy, setFinishBuy] = useState([]);
  const [totalPrice, setTotalPrice] = useState([]);
  const [noAdress, setNoAdress] = useState(false);

  const history = useHistory();
  console.log(carrito);

  useEffect(() => {
    carrito.length > 0 ? setFinishBuy([...carrito]) : history.push("/");
    setTotalPrice(plusCarritoPrices(carrito));

    return () => window.removeEventListener("click", handleUserAdress);
  }, [carrito]);

  const handleUserAdress = () =>
    userAdress.length > 0 ? handleFinishBuy() : setNoAdress(true);

  const handleFinishBuy = async () =>
    await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer TEST-8996856766715937-020519-760b56814269813cb5d24795ad20153d-398590246",
      },
      body: JSON.stringify({
        items: carrito.map((prod) => {
          return {
            title: prod.name,
            auto_return: "http://localhost:3000/mis-compras",
            quantity: prod.quantity,
            currency_id: "ARS",
            unit_price: prod.price,
          };
        }),
      }),
    })
      .then((results) => results.json())
      .then((results) => {
        window.open(results.init_point, "_blank").focus();
        console.log(results);
      })
      .then(() => setDeleteCarrito(finishBuy))
      .then(() => history.push("/mis-compras"));

  return (
    <section className="section">
      <div className="section__container finishBuy">
        <div className="col-xl-8 mt-5 pr-5">
          <ShippingAdress user={user} />

          {finishBuy.length > 0
            ? finishBuy.map((product, index) => (
                <ContainerPackageProduct
                  product={product}
                  getDateShipping={getDateShipping}
                  index={index + 1}
                />
              ))
            : null}

          <BuyButton handleUserAdress={handleUserAdress} />
          {noAdress ? (
            <Alert variant="danger">Debe existir una dirección de envío.</Alert>
          ) : null}
        </div>

        <SummaryBuy finishBuy={finishBuy} totalPrice={totalPrice} />
      </div>
    </section>
  );
};

export default FinishBuy;
