import { createContext, useState, useEffect } from "react";
import { useHistory, Redirect } from "react-router-dom";

export const GlobalContext = createContext();

export const GlobalExportContext = ({ children }) => {
  // state para la busqueda.
  const [search, setSearch] = useState("");

  // State para el carrito.
  const [carrito, setCarrito] = useState([]);

  const [quantity, setQuantity] = useState([]);
  const [stock, setStock] = useState();

  // State perteneciente al input y su estado
  const [cantidadFinal, setCantidadFinal] = useState(1);
  const [spinnerLoader, setSpinnerLoader] = useState(false);

  useEffect(() => {
    if (carrito.length === 0) {
      JSON.parse(localStorage.getItem("carrito"))
        ? setCarrito(JSON.parse(localStorage.getItem("carrito")))
        : setCarrito(carrito);
    } else if (carrito.length > 0) {
      localStorage.setItem("carrito", JSON.stringify(carrito));
    }
  }, [carrito]);

  const addCarrito = (producto, cantidaInput, stock) => {
    console.log(producto);
    if (
      !carrito.find((product) => product === null) &&
      !carrito.find((product) => product.id === producto.id)
    ) {
      const product = createProducto(
        producto.id,
        producto.title,
        producto.price * cantidaInput,
        producto.thumbnail,
        cantidaInput,
        producto.original_price
          ? (100 - (producto.price / producto.original_price) * 100).toFixed(0)
          : null,
        producto.original_price ? producto.original_price : null,
        stock,
        producto.price,
        producto.shipping.free_shipping,
        producto.shipping.logistic_type
      );
      setCarrito([...carrito, product]);
      localStorage.setItem("carrito", JSON.stringify([...carrito, product]));
    } else {
      carrito.forEach((product) => {
        if (product.id === producto.id) {
          product.quantity += cantidaInput;
          product.price += producto.price * cantidaInput;
        }
      });
      localStorage.setItem("carrito", JSON.stringify([...carrito]));
    }
  };

  const handleExistUser = (user, producto, history) =>
    user.length > 0
      ? addCarrito(producto, cantidadFinal, stock)
      : history.push("/sign-up");

  const handleClickCard = (idProducto, history) =>
    history.push(`/producto/${idProducto}`);

  const addQuantity = (id, stock) => {
    carrito.forEach((producto) => {
      if (producto.id === id) {
        producto.quantity >= stock
          ? (producto.quantity = stock)
          : (producto.quantity += 1);

        producto.price = producto.original_price * producto.quantity;

        setCarrito(
          carrito.map((deleteItem) => {
            if (deleteItem.id !== id) {
              return deleteItem;
            } else {
              return producto;
            }
          })
        );
      }
    });
  };

  const lessQuantity = (id) => {
    carrito.forEach((producto, index) => {
      if (producto.id === id) {
        producto.quantity <= 1
          ? (producto.quantity = 1)
          : (producto.quantity -= 1);

        producto.price = producto.original_price * producto.quantity;
        setCarrito(
          carrito.map((deleteItem) => {
            if (deleteItem.id !== id) {
              return deleteItem;
            } else {
              return producto;
            }
          })
        );
      }
    });
  };

  const deleteProduct = (productId) => {
    const newCarrito = carrito.filter((producto) => producto.id !== productId);
    setCarrito(newCarrito);
    console.log(newCarrito);
    if (newCarrito.length === 0) {
      localStorage.removeItem("carrito");
    } else {
      localStorage.setItem("carrito", JSON.stringify(newCarrito));
    }
  };

  const createProducto = (
    id,
    name,
    price,
    img,
    quantity,
    off = null,
    old_price = null,
    stock,
    original_price,
    free_shipping,
    logistic_type
  ) => {
    return {
      id: id,
      name: name,
      price: price,
      img: img,
      quantity: quantity,
      off: off,
      old_price: old_price,
      stock: stock,
      original_price: original_price,
      free_shipping: free_shipping,
      logistic_type: logistic_type,
    };
  };

  return (
    <GlobalContext.Provider
      value={{
        search,
        setSearch,
        carrito,
        setCarrito,
        createProducto,
        quantity,
        setQuantity,
        addQuantity,
        addCarrito,
        lessQuantity,
        deleteProduct,
        handleExistUser,
        cantidadFinal,
        setCantidadFinal,
        stock,
        setStock,
        handleClickCard,
        spinnerLoader,
        setSpinnerLoader,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
