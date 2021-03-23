/* eslint-disable no-undef */
/* eslint-disable default-case */
import { useState, useEffect, useContext } from "react";
import { Link, useParams, useHistory, useLocation } from "react-router-dom";
import { Pagination } from "react-bootstrap";
import SpinnerLoader from "../../components/spinnerLoader";
import AsideSearch from "../../components/search/asideSearch";
import CardSearch from "../../components/search/cardsSearch";
import { GlobalContext } from "../../context/GlobalContext";

import getDataFromApi from "../../modules/fetch";
import { UserSearchData } from "../../context/UserSearchData";
import { UserLogin } from "../../context/UserLoginContext";

const Search = () => {
  // Consigo los parametros de la busqueda.
  const {
    searchParam,
    filter,
    filter1,
    filter2,
    filter3,
    filter4,
    filter5,
  } = useParams();

  const [dataSearch, setDataSearch] = useState([]);

  // State para los filtros de busqueda.
  const [filters, setFilters] = useState([]);

  // State para la paginacion de los productos
  const [paginationItems, setPaginationItems] = useState([]);

  // States para filters en asideSearch
  const [filtersIn, setFiltersIn] = useState([]);
  const [firtsLoad, setFirstLoad] = useState(true);

  const history = useHistory();

  // Contexto de GlobalContext
  const { search, setSearch, spinnerLoader, setSpinnerLoader } = useContext(
    GlobalContext
  );
  const { fav, deleteFavUser, handleExistUserFav, user } = useContext(
    UserLogin
  );
  const { setLastSaw, setCategory, itemSeen, category } = useContext(
    UserSearchData
  );

  useEffect(() => {
    localStorage.getItem("categorySearch") &&
      setCategory(JSON.parse(localStorage.getItem("categorySearch")));
    inialDataProducts(true);
  }, [searchParam, filters]);

  const inialDataProducts = () => {
    setSpinnerLoader(true);
    setFiltersIn(JSON.parse(localStorage.getItem("filters")) || []);
    const filtersParams = addFilters(
      JSON.parse(localStorage.getItem("filters"))
    );
    getDataFromApi(filtersParams)
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        setDataSearch([data]);
        setSearch(data.results);
        setLastSaw(data);
        getImgProduct(data);
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setSpinnerLoader(false);
        setFirstLoad(false);
      });
  };

  const getImgProduct = async (dataProd) => {
    const array = [];
    const promise = new Promise((resolve, reject) => {
      dataProd.results.forEach(async (product, index, arrayProd) => {
        const apiItems = `https://api.mercadolibre.com/items?ids=${product.id}`;
        const data = await getDataFromApi(apiItems);
        const data_1 = await data.json();
        const data_2 = Object.assign(
          dataProd.results.find((prod) => prod.id === data_1[0].body.id),
          { newImg: data_1[0].body.pictures[0].url }
        );
        array.push(data_2);

        if (index === arrayProd.length - 1) {
          resolve(array);
        }
      });
    });
    return Promise.all([promise]).then((data) => setSearch(data.flat()));
  };

  const setFilterStorage = (data) => {
    localStorage.getItem("filters")
      ? localStorage.setItem(
          "filters",
          JSON.stringify([...JSON.parse(localStorage.getItem("filters")), data])
        )
      : localStorage.setItem("filters", JSON.stringify([data]));
  };

  const quitFilterStorage = (filterId) => {
    const newFilters = JSON.parse(localStorage.getItem("filters")).filter(
      (filter) => filter.id !== filterId
    );
    localStorage.setItem("filters", JSON.stringify(newFilters));
    newFilters.length === 0 && localStorage.removeItem("filters");
  };

  const getSearchParam = (param) =>
    param.includes("-") ? param.split("-").join("%20") : param;

  const getParam = (param) =>
    param.includes("-") ? param.split("-").join(" ") : param;

  const addFilters = (filtersIn) => {
    const categoryExist =
      category.length > 0
        ? `category=${getSearchParam(searchParam.trim())}`
        : `q=${getSearchParam(searchParam.trim())}`;
    console.log(category);
    let params;
    let apiFilters = `https://api.mercadolibre.com/sites/MLA/search?${getSearchParam(
      categoryExist
    )}`;
    filtersIn &&
      filtersIn.length > 0 &&
      filtersIn.forEach((filterUrl, index) => {
        switch (index) {
          case 0:
            params = `&${filterUrl.type}=${filter}`;
            break;
          case 1:
            params = `&${filterUrl.type}=${filter1}`;
            break;
          case 2:
            params = `&${filterUrl.type}=${filter2}`;
            break;
          case 3:
            params = `&${filterUrl.type}=${filter3}`;
            break;
          case 4:
            params = `&${filterUrl.type}=${filter4}`;
            break;
          case 5:
            params = `&${filterUrl.type}=${filter5}`;
            break;
        }
        apiFilters += params;
      });

    return apiFilters;
  };

  return (
    <>
      {console.log("hola")}
      <section className="section">
        <div className="section__container search">
          {firtsLoad ? (
            <SpinnerLoader loadPage={true} />
          ) : (
            <>
              <aside className="search__aside">
                <AsideSearch
                  searchParam={getParam(searchParam.trim())}
                  dataSearch={dataSearch}
                  setFilters={setFilters}
                  filters={filters}
                  filtersIn={filtersIn}
                  setFiltersIn={setFiltersIn}
                  history={history}
                  setCategory={setCategory}
                  category={category}
                  setFilterStorage={setFilterStorage}
                  quitFilterStorage={quitFilterStorage}
                />
              </aside>
              <section
                className={`search__products ${
                  spinnerLoader ? "d-flex align-items-stretch" : null
                }`}
              >
                {spinnerLoader ? (
                  <SpinnerLoader />
                ) : (
                  <CardSearch
                    search={search}
                    setSearch={setSearch}
                    itemSeen={itemSeen}
                    listProducts={getParam(searchParam.trim())}
                    fav={fav}
                    deleteFavUser={deleteFavUser}
                    handleExistUserFav={handleExistUserFav}
                    user={user}
                    history={history}
                  />
                )}
              </section>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Search;
