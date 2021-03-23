import { createContext, useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import getDataFromApi from "../modules/fetch";
import { getFireStore, deleteFieldFromDb } from "../utilitis/fireBase";
import { GlobalContext } from "./GlobalContext";

export const UserLogin = createContext();

export const UserLoginExport = ({ children }) => {
  const [user, setUser] = useState([]);
  // const [spinnerLoader, setSpinnerLoader] = useState(false);
  const [userAdress, setUserAdress] = useState([]);
  const [fav, setFav] = useState([]);
  const [fileId, setFileId] = useState(true);
  const [errorMail, setErrorMail] = useState(false);
  const [errorDni, setErrorDni] = useState(false);
  const [provincias, setProvincias] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [partido, setPartido] = useState(false);
  const [done, setDone] = useState(false);

  const history = useHistory();

  const { addCarrito, spinnerLoader, setSpinnerLoader } = useContext(
    GlobalContext
  );

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("user")) && !user.length > 0) {
      setUser(JSON.parse(localStorage.getItem("user")));
    } else if (user.length > 0) {
      user.forEach((user) => {
        user?.adress ? setUserAdress([user.adress]) : setUserAdress([]);
        user?.fav ? setFav(user.fav.map((fav) => fav)) : setFav([]);
      });
    }
  }, [user]);

  const craeteNewUser = (newUser) => {
    // setSpinnerLoader(true)
    const db = getFireStore();

    const users = db.collection("usuarios");

    users
      .add(newUser)
      .then(({ id }) => {
        !id && setFileId(false);
        const created = {
          id: id,
          name: newUser.name,
          surname: newUser.surname,
          dni: newUser.dni,
        };
        setUser([created]);
        localStorage.setItem("user", JSON.stringify(newUser));
      })
      .catch((e) => console.log(e))
      .finally(() => setTimeout(() => setSpinnerLoader(false)));
  };

  const updateDataUser = (idUser, datos) => {
    const db = getFireStore();
    const update = db.collection("usuarios").doc(idUser);

    update
      .update({
        adress: datos,
      })
      .then(() => {
        localStorage.setItem(
          "user",
          JSON.stringify({ ...user[0], id: idUser, adress: datos })
        );
        setUser([{ ...user[0], id: idUser, adress: datos }]);
      });
  };

  const updateFavUser = (idUser, datos) => {
    const db = getFireStore();
    const update = db.collection("usuarios").doc(idUser);

    console.log([...fav.map((favorite) => favorite), datos]);
    update
      .update({
        fav: [...fav.map((favorite) => favorite), datos],
      })
      .then(() =>
        localStorage.setItem(
          "user",
          JSON.stringify([
            {
              ...user[0],
              id: idUser,
              fav: [...fav.map((favorite) => favorite), datos],
            },
          ])
        )
      );
  };

  const deleteFavUser = (e, idUser, idFav) => {
    console.log(idUser);
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    const newFavsArray = [
      ...fav.filter((favorite) => favorite.idFav !== idFav),
    ];
    setFav(newFavsArray);

    const db = getFireStore();
    const update = db.collection("usuarios").doc(idUser);

    update
      .update({
        fav: newFavsArray,
      })
      .then(() => {
        localStorage.setItem(
          "user",
          JSON.stringify([{ ...user[0], id: idUser, fav: newFavsArray }])
        );
      });
  };

  const addCarritoFavUser = (arrayFav, history, id) => {
    const p1 = new Promise((res, rej) => {
      arrayFav.map((fav) => {
        return getDataFromApi(
          `https://api.mercadolibre.com/items?ids=${fav.idFav}`
        )
          .then((data) => data.json())
          .then((data) =>
            addCarrito(
              data[0].body,
              1,
              data[0].body.initial_quantity - data[0].body.sold_quantity
            )
          )
          .then(() => {
            localStorage.removeItem("user");
            localStorage.setItem(
              "user",
              JSON.stringify([...user.filter((field) => delete field.fav)])
            );
            setFav([]);
          })
          .then(() => deleteFieldFromDb(id))
          .then(() => res(true));
      });
    });

    return Promise.all([p1]).then(() => history.push("/carrito"));
  };

  const sessionOut = () => {
    localStorage.removeItem("user");
    setUser([]);
  };

  const handleExistUserFav = (e, user, producto, history) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    user.length > 0
      ? addFav(producto, ...user.map((user) => user.id))
      : history.push("/sign-up");
  };

  const addFav = (producto, userId) => {
    const newFav = productoFav(
      producto.title,
      producto.price,
      producto.thumbnail,
      producto.id
    );
    console.log(fav);
    if (fav.length > 0) {
      setFav([...fav, newFav]);
      updateFavUser(userId, newFav);
    } else {
      setFav([newFav]);
      updateFavUser(userId, newFav);
    }
  };

  const productoFav = (nombre, precio, imagen, id) => {
    return {
      name: nombre,
      price: precio,
      imageFav: imagen,
      idFav: id,
    };
  };

  return (
    <UserLogin.Provider
      value={{
        user,
        setUser,
        craeteNewUser,
        fileId,
        setFileId,
        errorMail,
        setErrorMail,
        errorDni,
        setErrorDni,
        sessionOut,
        updateDataUser,
        setUserAdress,
        userAdress,
        updateFavUser,
        fav,
        setFav,
        handleExistUserFav,
        deleteFavUser,
        addCarritoFavUser,
        provincias,
        setProvincias,
        municipios,
        setMunicipios,
        partido,
        setPartido,
        done,
        setDone,
      }}
    >
      {children}
    </UserLogin.Provider>
  );
};
