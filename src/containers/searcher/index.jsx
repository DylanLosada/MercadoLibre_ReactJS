import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useEffect, useContext } from "react";
import { UserSearchData } from "../../context/UserSearchData";

const Searcher = ({ imgLupa, predicterVisible, setPredicterVisible }) => {
  const [searcher, setSearcher] = useState("");
  const [active, setActive] = useState(false);
  const [newWord, setNewWord] = useState([]);
  const [downloadPredicts, setDownloadPredicts] = useState([]);
  const [predict, setPredict] = useState([]);

  const { handleSubmit } = useForm();

  const { setProductImg } = useContext(UserSearchData);
  const { setCategory } = useContext(UserSearchData);

  useEffect(() => {
    window.addEventListener("click", (e) => eventClickSearcher(e));

    localStorage.getItem("predict") &&
      setDownloadPredicts(JSON.parse(localStorage.getItem("predict")));

    return () => {
      window.removeEventListener("click", eventClickSearcher);
      window.removeEventListener("click", handleCleanCategory);
    };
  }, [newWord]);

  const history = useHistory();

  const eventClickSearcher = (e) => {
    const predicter = document.querySelector("#predicter");
    const inputSearchProduct = document.querySelector("#inputSearchProduct");
    const target = e.target;

    if (predicter) {
      console.log(target !== predicter && target !== inputSearchProduct);
      if (target !== predicter && target !== inputSearchProduct) {
        setPredicterVisible(false);
      } else {
        setPredicterVisible(true);
      }
    }
  };

  const searchFunction = (e) => {
    let get = "";
    let text = e.target.value.trim().toLowerCase();

    if (text.includes(" ")) {
      get += text
        .split(" ")
        .map((space) => {
          const whiteSpace = space.split("");
          if (whiteSpace.includes(" ")) {
            return whiteSpace.splice(whiteSpace.indexOf(" "), 1).join("");
          } else {
            return space;
          }
        })
        .join("-");
    } else {
      get += text;
    }

    setSearcher(get);

    if (get.length >= 3 && downloadPredicts.length > 0) {
      setPredict(
        downloadPredicts.filter((word) =>
          word.includes(get.split("-").join(" "))
        )
      );
      setActive(true);
    }
  };

  const handleSubmitSearch = (e) => {
    const newSearcher = searcher.split("-").join(" ");
    if (searcher.length > 0) {
      if (!downloadPredicts.includes(newSearcher)) {
        localStorage.getItem("predict")
          ? localStorage.setItem(
              "predict",
              JSON.stringify([...downloadPredicts, newSearcher])
            )
          : localStorage.setItem("predict", JSON.stringify([newSearcher]));
        setNewWord((ant) => [...ant, newSearcher]);
      }
      setCategory([]);
      localStorage.removeItem("categorySearch");
      history.push(`/search/${searcher}`);
    }
  };

  const handleCleanCategory = () => {
    setCategory([]);
    localStorage.removeItem("categorySearch");
  };

  return (
    <form
      className="header__searcher shadow rounded"
      method="GET"
      onSubmit={handleSubmit(handleSubmitSearch)}
    >
      <input
        id="inputSearchProduct"
        type="text"
        placeholder="Buscar productos, marcas y más..."
        autoComplete="off"
        onChange={(e) => searchFunction(e)}
      ></input>
      <Link to={searcher.length > 0 ? `/search/${searcher}` : "/"}>
        <div className="header__searcher-lupaButton">
          <img src={imgLupa} alt="Lupa" srcset="" />
        </div>
      </Link>

      {predict.length > 0 && active ? (
        <div
          id="predicter"
          className={`header__searcher-predict ${
            !predicterVisible && "d-none"
          }`}
        >
          {predict.map((art, index) => (
            <Link
              to={`/search/${art.split(" ").join("-")}`}
              className="w-100 header__searcher-predict-link"
              onClick={() => handleCleanCategory()}
            >
              <h4 key={index} className="header__searcher-predict-link-name">
                <i class="far fa-clock"></i>
                {art}
              </h4>
            </Link>
          ))}
        </div>
      ) : null}
    </form>
  );
};

export default Searcher;
