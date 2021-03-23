// Importo fetch
import getDataFromApi from "../modules/fetch";

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Logo from "../components/header/logo";
import NavBar from "./navBar";
import Envios from "../components/header/envios";
import Searcher from "./searcher";
import HeaderSignUp from "../components/header/headerSignUp";
import { UserLogin } from "../context/UserLoginContext";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

const apiMlCategorias =
  "https://api.mercadolibre.com/sites/MLA/categories?limit=10";
const apiTipoVendedor = "https://api.mercadolibre.com/sites/MLA/listing_types"; // Para mañana

const Header = ({ predicterVisible, setPredicterVisible }) => {
  // Uso el state para generar categorias y subCategorias.
  const [categorias, setCategorias] = useState([]);
  const [imgLocation, setImgLocation] = useState("");
  const [imgLupa, setImgLupa] = useState("");
  const [imgCarrito, setimgCarrito] = useState("");

  const location = useLocation().pathname;

  const { setFav, fav } = useContext(UserLogin);

  useEffect(() => {
    // Categorías
    getDataFromApi(apiMlCategorias)
      .then((data) => data.json())
      .then((data) => setCategorias(data.splice(0, 15)))
      .catch((error) => console.log(error));

    setImgLocation("./assets/iconos/ubicacion.svg");

    setImgLupa("./assets/iconos/lupa.svg");

    setimgCarrito("./assets/iconos/carrito.svg");
  }, []);

  return (
    <>
      {location === "/sign-up" ? (
        <HeaderSignUp />
      ) : (
        <header id="header" className="container-2xl">
          <div className="header__container flex flex-row flex-wrap">
            <Logo />
            <Searcher
              imgLupa={imgLupa}
              predicterVisible={predicterVisible}
              setPredicterVisible={setPredicterVisible}
            />
            <Envios />
            <NavBar
              imgLocation={imgLocation}
              imgCarrito={imgCarrito}
              fav={fav}
              setFav={setFav}
              categorias={categorias}
            />
          </div>
        </header>
      )}
    </>
  );
};
export default Header;
