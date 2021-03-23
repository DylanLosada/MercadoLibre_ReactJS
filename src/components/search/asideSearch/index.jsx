import React, { Fragment, useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserSearchData } from "../../../context/UserSearchData";

const AsideSearch = React.memo(
  ({
    searchParam,
    dataSearch,
    setFilters = null,
    filters = null,
    filtersIn,
    setFiltersIn,
    history,
    setCategory,
    category,
    setFilterStorage,
    quitFilterStorage,
  }) => {
    const [url, setUrl] = useState("");

    const location = useLocation();

    useEffect(() => {
      setUrl(location.pathname);
    }, [location]);

    const pathProduct = (dataSearch) =>
      dataSearch[0]?.filters.filter((categoria) => categoria.id === "category");

    const createFilterItem = (dataSearch, busqueda) => {
      // const objAvailableFilters = dataSearch[0].available_filters;
      // const arrayFilters = [];
      const arrayValues = [];

      // const filter = objAvailableFilters.find(filter => filter.id === busqueda)

      dataSearch[0].results.map((filterAttribute) =>
        // console.log(filter)
        filterAttribute.attributes.forEach((attribute) => {
          if (
            attribute.id === busqueda &&
            !arrayValues.find((name) => name[1] === attribute.value_name) &&
            attribute.value_id
          ) {
            arrayValues.push([attribute.value_id, attribute.value_name]);
          }
        })
      );
      // console.log(arrayFilters)
      return arrayValues.sort();
    };

    const createFilterInfoSeller = (dataSearch) => {
      const arrayValues = [];
      dataSearch[0].results.forEach((filter) => {
        if (
          !arrayValues.find((ciudad) => ciudad[0] === filter.seller.id) &&
          !arrayValues.find((ciudad) => ciudad[1] === filter.seller.name)
        ) {
          arrayValues.push([filter.seller.id, filter.seller_address.city.name]);
        }
      });
      return arrayValues;
    };

    const createFilterBestSeller = (dataSearch) => {
      let i = 0;
      dataSearch[0].results.forEach((filter) => {
        try {
          if (
            filter.seller.seller_reputation.power_seller_status === "platinum"
          ) {
            i++;
          }
        } catch {
          return;
        }
      });
      return i;
    };

    const createFilterPrices = (dataSearch) => {
      const arrayOficialStoreName = [];
      dataSearch[0].available_filters.forEach((filter) => {
        try {
          if (filter.id === "price") {
            arrayOficialStoreName.push(...filter.values);
          }
        } catch {
          return;
        }
      });
      return arrayOficialStoreName;
    };

    const updateSetFilters = (filter, name, id) => {
      filtersIn && filtersIn.length > 0
        ? setFiltersIn([...filtersIn, { type: filter, name: name, id: id }])
        : setFiltersIn([{ type: filter, name: name, id: id }]);

      setFilterStorage({ type: filter, name: name, id: id });
      return filters.includes(filter) ? null : setFilters([...filters, filter]);
    };

    const quitFilter = (filterId, filtertype) => {
      const newUrl = url
        .split("/")
        .filter((fil) => fil !== filterId)
        .join("/");

      setFiltersIn(filtersIn.filter((fil) => fil.id !== filterId));
      setFilters(filters.filter((fil) => fil !== filtertype));
      quitFilterStorage(filterId);
      history.push(newUrl);
    };

    return (
      <Fragment>
        {dataSearch.length > 0 ? (
          <div className="w-100">
            <div className="search__aside-titleContainer">
              {dataSearch[0]?.filters.length > 0
                ? pathProduct(dataSearch).map((path) => (
                    <ol className="search__aside-titleContainer-path">
                      {path.values[0].path_from_root
                        .reverse()
                        .map((pathIndex, index) => (
                          <li className="search__aside-titleContainer-path-pathName">
                            <Link
                              to={`/search/${pathIndex.id}`}
                              className="search__aside-titleContainer-path-pathName-link"
                              onClick={() => {
                                setCategory(pathIndex.name);
                                localStorage.setItem(
                                  "categorySearch",
                                  JSON.stringify(pathIndex.name)
                                );
                              }}
                            >
                              {pathIndex.name}
                            </Link>
                            {index ===
                            path.values[0].path_from_root.length - 1 ? null : (
                              <svg
                                className="search__aside-titleContainer-path-pathName-link-arrow"
                                viewBox="0 0 9 14"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M1 1.343L6.657 7 1 12.657"
                                ></path>
                              </svg>
                            )}
                          </li>
                        ))}
                    </ol>
                  ))
                : null}

              <h1 className="search__aside-titleContainer-title">
                {category.length > 0 ? category : searchParam}
              </h1>
            </div>

            <div className="search__aside-quantity">
              <span className="search__aside-quantity-results">
                {dataSearch[0].results.length} resultados
              </span>
            </div>

            {filtersIn && filtersIn.length > 0 ? (
              <div className="search__aside-relatedSearch">
                {filtersIn.map((filter, index) => (
                  <div
                    key={index}
                    className="search__aside-relatedSearch-search"
                    onClick={() => quitFilter(filter.id, filter.type)}
                  >
                    <div>
                      <div className="search__aside-relatedSearch-search-nameContainer">
                        <p className="search__aside-relatedSearch-search-nameContainer-name">
                          {filter.name}
                        </p>
                        <button className="search__aside-relatedSearch-search-cross">
                          <svg
                            className="search__aside-relatedSearch-search-cross"
                            viewBox="0 0 10 10"
                          >
                            <path d="M404 760l-1-1-4 4-4-4-1 1 4 4-4 4 1 1 4-4 4 4 1-1-4-4z"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

            <div className="search__aside-filters">
              <dl
                className={`search__aside-filters-title ${
                  filtersIn && filtersIn.length > 0
                    ? filtersIn.find((filter) => filter.type === "price") &&
                      "d-none"
                    : null
                }`}
              >
                <dt className="search__aside-filters-title-name">Precios</dt>
                {createFilterPrices(dataSearch).map((modelo) => (
                  <dd>
                    <Link
                      to={`${url}/${modelo.id}`}
                      onClick={() =>
                        updateSetFilters("price", modelo.name, modelo.id)
                      }
                    >
                      {modelo.name}
                    </Link>
                  </dd>
                ))}
              </dl>

              <dl
                className={`search__aside-filters-title ${
                  filtersIn && filtersIn.length > 0
                    ? filtersIn.find((filter) => filter.type === "MODEL") &&
                      "d-none"
                    : null
                }`}
              >
                <dt className="search__aside-filters-title-name">Modelo</dt>
                {createFilterItem(dataSearch, "MODEL").map((modelo) => (
                  <dd>
                    <Link
                      to={`${url}/${modelo[0]}`}
                      onClick={() =>
                        updateSetFilters("MODEL", modelo[1], modelo[0])
                      }
                    >
                      {modelo[1]}
                    </Link>
                  </dd>
                ))}
              </dl>

              <dl
                className={`search__aside-filters-title ${
                  filtersIn && filtersIn.length > 0
                    ? filtersIn.find(
                        (filter) => filter.type === "ITEM_CONDITION"
                      ) && "d-none"
                    : null
                }`}
              >
                <dt className={`search__aside-filters-title-name`}>
                  Condición
                </dt>
                {createFilterItem(dataSearch, "ITEM_CONDITION").map(
                  (modelo) => (
                    <dd>
                      <Link
                        to={`${url}/${modelo[0]}`}
                        replace={true}
                        onClick={() =>
                          updateSetFilters(
                            "ITEM_CONDITION",
                            modelo[1],
                            modelo[0]
                          )
                        }
                      >
                        {modelo[1]}
                      </Link>
                    </dd>
                  )
                )}
              </dl>

              <dl
                className={`search__aside-filters-title ${
                  filtersIn && filtersIn.length > 0
                    ? filtersIn.find((filter) => filter.type === "LINE") &&
                      "d-none"
                    : null
                }`}
              >
                <dt className="search__aside-filters-title-name">Línea</dt>
                {createFilterItem(dataSearch, "LINE").map((modelo) => (
                  <dd>
                    <Link
                      to={`${url}/${modelo[0]}`}
                      onClick={() =>
                        updateSetFilters("LINE", modelo[1], modelo[0])
                      }
                    >
                      {modelo[1]}
                    </Link>
                  </dd>
                ))}
              </dl>

              <dl
                className={`search__aside-filters-title ${
                  filtersIn && filtersIn.length > 0
                    ? filtersIn.find((filter) => filter.type === "seller_id") &&
                      "d-none"
                    : null
                }`}
              >
                <dt className="search__aside-filters-title-name">Ubicación</dt>
                {createFilterInfoSeller(dataSearch).map((modelo, index) => (
                  <dd>
                    <Link
                      to={`${url}/${modelo[0]}`}
                      onClick={() =>
                        updateSetFilters("seller_id", modelo[1], modelo[0])
                      }
                    >
                      {modelo[1]}
                    </Link>
                  </dd>
                ))}
              </dl>

              <dl className="search__aside-filters-title">
                <dt className="search__aside-filters-title-name">
                  Detalles de la publicación
                </dt>
                Mejores vendedores ({createFilterBestSeller(dataSearch)})
              </dl>
            </div>
          </div>
        ) : null}
      </Fragment>
    );
  }
);

export default AsideSearch;
