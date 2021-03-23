/* eslint-disable default-case */
/* eslint-disable no-undef */
import FormCompra from "../../components/main/formCompra";
import ImageProduct from "../../components/main/imageProduct";
import SpinnerLoader from "../../components/spinnerLoader";
import PathProduct from "../../components/main/pathProduct";

import getDataFromApi from "../../modules/fetch";

import { useEffect, useState, useContext } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { GlobalContext } from "../../context/GlobalContext";
import { UserLogin } from "../../context/UserLoginContext";
import { UserSearchData } from "../../context/UserSearchData";

const Producto = () => {
  // recupero el id del producto para realizar la nueva consulta
  const { idProducto, listProducts } = useParams();
  const history = useHistory();

  // Cargo el state del producto
  const [producto, setProducto] = useState([]);
  const [seller, setSeller] = useState({});
  const [infoProduct, setInfoProduct] = useState([]);
  const [pathProduct, setPathProduct] = useState([]);
  const [typeSeller, setTypeSeller] = useState([]);

  console.log(idProducto, listProducts);

  const {
    search,
    handleExistUser,
    cantidadFinal,
    setCantidadFinal,
    stock,
    setStock,
    handleClickCard,
    spinnerLoader,
    setSpinnerLoader,
  } = useContext(GlobalContext);
  const { user, fav, deleteFavUser, handleExistUserFav } = useContext(
    UserLogin
  );
  const { setSimilarSeen, setLastSaw, itemSeen } = useContext(UserSearchData);

  useEffect(() => {
    setSpinnerLoader(true);
    const apiItems = `https://api.mercadolibre.com/items?ids=${idProducto}`;
    getDataFromApi(apiItems)
      .then((data) => data.json())
      .then((data) => {
        setProducto(data[0].body);
        console.log(data[0].body);
        setLastSaw(data[0].body.category_id);
        setSimilarSeen(data[0].body.catalog_product_id);
        console.log(data[0]);
        getDataFromApi(
          `https://api.mercadolibre.com/sites/MLA/search?seller_id=${data[0].body.seller_id}`
        )
          .then((data) => data.json())
          .then((data) => setSeller(data));
        return data[0].body;
      })
      .then((data) => {
        setStock({ stock: data.initial_quantity - data.sold_quantity });
        getDataFromApi(
          `https://api.mercadolibre.com/categories/${data.category_id}`
        )
          .then((data) => data.json())
          .then((data) =>
            setPathProduct(
              data.path_from_root.reverse().map((name) => name.name)
            )
          );
      })
      .finally(() => setSpinnerLoader(false));

    const apiVo = "https://api.mercadolibre.com/sites/MLA/listing_types";
    getDataFromApi(apiVo)
      .then((data) => data.json())
      .then((data) => setTypeSeller(data.map((type) => type.id)));

    search.length > 0 &&
      setInfoProduct(search.find((result) => result.id === idProducto));
  }, [idProducto]);

  return (
    <>
      <section className="section section--marginTop">
        {!spinnerLoader && (
          <PathProduct pathProduct={pathProduct} listProducts={listProducts} />
        )}
        <div
          className={`section__container producto h-auto ${
            spinnerLoader && "d-flex align-itmes-stretch"
          }`}
        >
          {!spinnerLoader ? (
            <>
              <div className="row d-flex flex-row justify-content-between m-0">
                <ImageProduct
                  producto={producto}
                  seller={seller}
                  user={user}
                  handleExistUser={handleExistUser}
                  cantidaInput={cantidadFinal}
                  setCantidadInput={setCantidadFinal}
                  history={history}
                  handleClickCard={handleClickCard}
                  fav={fav}
                  deleteFavUser={deleteFavUser}
                  handleExistUserFav={handleExistUserFav}
                  itemSeen={itemSeen}
                />
                <FormCompra
                  producto={producto}
                  infoProduct={infoProduct}
                  stock={stock}
                  user={user}
                  handleExistUser={handleExistUser}
                  cantidadFinal={cantidadFinal}
                  setCantidadFinal={setCantidadFinal}
                  history={history}
                  seller={seller}
                />
              </div>
            </>
          ) : (
            <SpinnerLoader />
          )}
        </div>
      </section>
    </>
  );
};

export default Producto;
