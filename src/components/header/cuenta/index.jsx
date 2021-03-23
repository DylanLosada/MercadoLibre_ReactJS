import { Dropdown, DropdownButton } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserAccount from "../userAccount";

const Usuario = ({
  imgCarrito,
  fav,
  history,
  user,
  sessionOut,
  deleteFavUser,
  addCarritoFavUser,
}) => {
  console.log(fav);
  return (
    <nav className="header__navBar-usuario">
      <ul className="header__navBar-usuario-ul">
        <li
          className={
            user.length > 0 &&
            "header__navBar-usuario-ul-option header__navBar-usuario-ul-option--width dropMenu dropMenu--colorRow relative"
          }
        >
          {user.length > 0 ? (
            <UserAccount user={user} sessionOut={sessionOut} />
          ) : (
            <Link
              className="header__navBar-usuario-ul-option header__navBar-usuario-ul-option--width"
              to={"/sign-in"}
            >
              Creá tu cuenta
            </Link>
          )}
        </li>
        {user.length === 0 ? (
          <li>
            <Link className="header__navBar-usuario-ul-option" to={"/sign-up"}>
              Ingresá
            </Link>
          </li>
        ) : null}
        <li>
          <Link
            to={"/mis-compras"}
            className="header__navBar-usuario-ul-option"
          >
            Mis compras
          </Link>
        </li>
        {user.length > 0 ? (
          <li className="header__navBar-usuario-ul-option header__navBar-usuario-ul-fav relative btn--modifiqued">
            Favoritos
            <div className="header__navBar-usuario-ul-fav-dropDown favoritos">
              <div className="favoritos__title">Favoritos</div>
              <ul className="favoritos__ul">
                {fav.length > 0
                  ? fav.map((fav) => (
                      <li key={fav.idFav}>
                        <div
                          className="favoritos__ul-item relative"
                          href="#/action-1"
                        >
                          <div
                            className="favoritos__delete"
                            onClick={(e) =>
                              deleteFavUser(e, user[0].id, fav.idFav)
                            }
                          >
                            Eliminar
                          </div>
                          <img
                            className="favoritos__ul-item-img"
                            src={fav.imageFav}
                            alt="Producto favorito"
                          />
                          <div className="favoritos__ul-item-desc">
                            <h3 className="favoritos__ul-item-desc-title">
                              {fav.name}
                            </h3>
                            <div className="favoritos__ul-item-desc-precio">
                              $ {fav.price}
                            </div>
                          </div>
                        </div>
                      </li>
                    ))
                  : null}
              </ul>
              {fav.length > 0 && (
                <div
                  onClick={() => addCarritoFavUser(fav, history, user[0].id)}
                  className="favoritos__verTodo"
                >
                  Agregar al carrito
                </div>
              )}
            </div>
          </li>
        ) : null}
        <Link
          to={user.length > 0 ? "/carrito" : "/sign-up"}
          className="header__navBar-usuario-ul-liCarriro"
        >
          <img src={imgCarrito} alt="Carrito" />
        </Link>
      </ul>
    </nav>
  );
};

export default Usuario;
