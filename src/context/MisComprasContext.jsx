import { createContext, useState, useEffect } from "react";
import { getFireStore, conecctionDb } from "../utilitis/fireBase";

export const MisComprasContext = createContext();

export const MisComprasExportContext = ({ children }) => {
  const [misCompras, setMisCompras] = useState();
  const [deleteCarrito, setDeleteCarrito] = useState([]);
  const [showCompras, setShowCompras] = useState([]);

  const setMisComprasUser = async (idUser, datos) => {
    const db = getFireStore();
    const misComprasConnection = db.collection("misCompras");
    const newObj = {};
    const date = new Date();
    const dateBuyed = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()} -- ${date.getHours()}:${date.getMinutes()} Hs.`;
    console.log(Object.assign(newObj, datos));

    const objectMisCompras = {
      shopping: datos,
    };

    return await misComprasConnection
      .add(Object.assign(objectMisCompras, { idUser: idUser, date: dateBuyed }))
      .then(({ id }) => {
        const created = Object.assign(objectMisCompras, {
          idUser: idUser,
          idCompra: id,
          date: dateBuyed,
        });
        localStorage.setItem("misCompras", JSON.stringify([created]));
        setDeleteCarrito([]);
        return setShowCompras([created]);
      })
      .catch((e) => console.log(e));
  };

  const showMisCompras = async (idUser) => {
    const db = getFireStore();
    const misComprasConnection = db.collection("misCompras");

    return await misComprasConnection.get().then((results) => {
      const data = results.docs
        .map((doc) => {
          return Object.assign(doc.data(), { idCompra: doc.id });
        })
        .filter((item) => item.idUser === idUser);
      console.log(data);
      localStorage.setItem("misCompras", JSON.stringify(data));
      return setShowCompras(data);
    });
  };

  return (
    <MisComprasContext.Provider
      value={{
        deleteCarrito,
        setDeleteCarrito,
        setMisComprasUser,
        setMisCompras,
        misCompras,
        showCompras,
        showMisCompras,
      }}
    >
      {children}
    </MisComprasContext.Provider>
  );
};
