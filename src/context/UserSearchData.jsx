import { createContext } from "react";
import React, { useState, useEffect } from "react";

export const UserSearchData = createContext();

const UserExportSearchData = ({ children }) => {
  const [lastSaw, setLastSaw] = useState("");
  const [historial, setHistorial] = useState([]);
  const [similarSeen, setSimilarSeen] = useState();
  const [category, setCategory] = useState("");
  // const [searchCategory, setSearchCategory] = useState();

  useEffect(() => {
    console.log(JSON.parse(localStorage.getItem("lastSaw")));
    JSON.parse(localStorage.getItem("lastSaw")) &&
      setLastSaw(JSON.parse(localStorage.getItem("lastSaw")));

    JSON.parse(localStorage.getItem("similarSeen")) &&
      setSimilarSeen(JSON.parse(localStorage.getItem("similarSeen")));

    JSON.parse(localStorage.getItem("historial")) &&
      setHistorial(JSON.parse(localStorage.getItem("historial")));
  }, []);

  const itemSeen = (item) => {
    if (historial.length > 0) {
      if (historial.find((itemSave) => itemSave.id === item.id)) {
        setHistorial(historial);
        localStorage.setItem("historial", JSON.stringify(historial));
      } else {
        setHistorial([...historial, item]);
        localStorage.setItem("historial", JSON.stringify([...historial, item]));
      }
    } else {
      setHistorial([item]);
    }
  };

  return (
    <UserSearchData.Provider
      value={{
        lastSaw,
        setLastSaw,
        similarSeen,
        setSimilarSeen,
        category,
        setCategory,
        historial,
        setHistorial,
        itemSeen,
      }}
    >
      {children}
    </UserSearchData.Provider>
  );
};

export default UserExportSearchData;
