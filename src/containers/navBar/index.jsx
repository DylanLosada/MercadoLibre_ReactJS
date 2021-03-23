import getDataFromApi from "../../modules/fetch";
import React, { useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import Usuario from "../../components/header/cuenta";
import { UserLogin } from "../../context/UserLoginContext";
import { conecctionDb } from "../../utilitis/fireBase";
import { UserSearchData } from "../../context/UserSearchData";

const apiCategorias = "https://api.mercadolibre.com/sites/MLA/categories";

const NavBar = ({ imgLocation, imgCarrito, fav, setFav, categorias }) => {
  const {
    user,
    sessionOut,
    updateFavUser,
    deleteFavUser,
    addCarritoFavUser,
  } = useContext(UserLogin);

  const { setSearchCategory, setCategory } = useContext(UserSearchData);

  const history = useHistory();

  useEffect(() => {
    getDataFromApi(apiCategorias)
      .then((data) => data.json())
      .then((data) => console.log(data.splice(0, 15)));

    return () => {
      window.removeEventListener("click", handleSetCategory());
    };
  }, []);

  const handleSetCategory = (name) => {
    setCategory(name);
    localStorage.setItem("categorySearch", JSON.stringify(name));
  };

  return (
    <div className="header__navBar flex-1 flex-grow">
      <a
        className="header__navBar-capitalLink"
        href="https://www.mercadolibre.com.ar/navigation/addresses-hub?go=https%3A%2F%2Flistado.mercadolibre.com.ar%2Fyerba-canarias_Deal_verano-liquidacion-cuidado-moda"
        data-modal-action="true"
        tabIndex="6"
      >
        <img src={imgLocation} alt="Envias a Capital" srcset="" />
        <div>
          <p className="header__navBar-capitalLink-send">Enviar a</p>
          <p className="header__navBar-capitalLink-capital"> Capital Federal</p>
        </div>
      </a>

      <nav className="header__navBar-nav">
        <ul className="header__navBar-nav-ul">
          <li className="header__navBar-nav-ul-list">
            Categorías
            {categorias.length > 0 ? (
              <nav
                id="categorias"
                className="header__navBar-nav-ul-list-categories"
              >
                <ul className="header__navBar-nav-ul-list-categories-list">
                  {categorias.map((categoria) => (
                    <li key={categoria.id}>
                      <Link
                        to={`/search/${categoria.id}`}
                        className="header__navBar-nav-ul-list-categories-list-categorie"
                        onClick={() => handleSetCategory(categoria.name)}
                      >
                        {categoria.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : null}
          </li>
          <li>
            <Link to={`/#ofertas`}>Ofertas</Link>
          </li>
          <li>
            <Link to="/historial">Historial</Link>
          </li>
          <li>
            <Link to={"/search/supermercado"}>Supermercado</Link>
          </li>
          {/* <li>
            <Link to={"/oficial-store"}>Tiendas Oficiales</Link>
          </li> */}
          {/* <li>
            <a>Vender</a>
          </li>
          <li>
            <a>Ayuda</a>
          </li> */}
        </ul>
      </nav>

      <Usuario
        imgCarrito={imgCarrito}
        fav={fav}
        updateFavUser={updateFavUser}
        user={user}
        sessionOut={sessionOut}
        deleteFavUser={deleteFavUser}
        addCarritoFavUser={addCarritoFavUser}
        history={history}
      />
    </div>
  );
};
export default React.memo(NavBar);
