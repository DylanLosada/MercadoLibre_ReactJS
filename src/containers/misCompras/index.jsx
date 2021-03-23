import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { MisComprasContext } from "../../context/MisComprasContext";
import { UserLogin } from "../../context/UserLoginContext";
import { conecctionDb } from "../../utilitis/fireBase";
import CardsMisCompras from "../../components/main/cardsMisCompras";

const MisCompras = () => {
  const { setCarrito } = useContext(GlobalContext);
  const { user } = useContext(UserLogin);
  const {
    deleteCarrito,
    setMisComprasUser,
    setMisCompras,
    misCompras,
    showCompras,
    showMisCompras,
  } = useContext(MisComprasContext);

  useEffect(() => {
    if (deleteCarrito.length > 0) {
      setCarrito([]);
      localStorage.removeItem("carrito");

      conecctionDb("misCompras")
        .then((results) => results.docs.map((doc) => doc.data()))
        .then((results) => setMisCompras(results));
      setMisComprasUser(user[0].id, deleteCarrito);
    } else {
      user.length > 0 && showMisCompras(user[0].id);
    }
  }, [deleteCarrito, user]);

  return (
    <section className="section mt-5">
      <div className="section__container w-75 h-auto">
        {showCompras.length > 0 ? (
          showCompras.map((product, index) => (
            <CardsMisCompras
              product={product.shopping}
              date={product.date}
              idProduct={product.idCompra}
              index={index + 1}
            />
          ))
        ) : (
          <h1>No has hecho ninguna compra aún.</h1>
        )}
      </div>
    </section>
  );
};

export default MisCompras;
