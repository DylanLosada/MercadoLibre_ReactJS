// Importo fetch
import getDataFromApi from "../modules/fetch";

// State
import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
// Libreria Swiper para sliders
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

// Components
import ItemCounter from "./itemCounter";
import Cards from "../components/main/cards";
import MediosPago from "../components/main/mediosPago";
import SpinnerLoader from "../components/spinnerLoader";
import { UserSearchData } from "../context/UserSearchData";
import { UserLogin } from "../context/UserLoginContext";
import { GlobalContext } from "../context/GlobalContext";

// install Swiper components
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

// const token = 'TEST-8996856766715937-020519-760b56814269813cb5d24795ad20153d-398590246';
const apiIMediosPago = "./dbLocal/mediosPago/mediosPago.json";
const apiMlaUrl =
  "https://api.mercadolibre.com/sites/MLA/search?q=Sony&limit=25&status=active";
const apiBanner =
  "https://api.mercadolibre.com/sites/MLA/search?category=MLA1071";
const apiDb = "./dbLocal/banners.json";
const apiDiscount =
  "https://api.mercadolibre.com/sites/MLA/search?q=ofertas&discount=5-100";
const apiDeals = "https://api.mercadolibre.com/sites/MLA/search?q=ofertas";

const Main = () => {
  // Uso el state para generar el banner principal.
  const [banner, setBanner] = useState([]);

  // Uso el state para generar el banner principal.
  const [visto, setVisto] = useState([]);

  // Uso el state.
  const [mediosPago, setMediosPago] = useState([]);

  // Uso el state para generar ofertas.
  const [ofertas, setOfertas] = useState([]);

  // Uso el state para generar ofertas.
  const [intereses, setIntereses] = useState([]);

  const history = useHistory();

  const { lastSaw, similarSeen, setSimilarSeen, itemSeen } = useContext(
    UserSearchData
  );
  const { fav, deleteFavUser, handleExistUserFav, user } = useContext(
    UserLogin
  );
  const { handleClickCard, spinnerLoader, setSpinnerLoader } = useContext(
    GlobalContext
  );

  // Imágenes Lógica.
  useEffect(() => {
    setSpinnerLoader(true);
    // Medios de pago.
    const p1 = new Promise((res, rej) => {
      return getDataFromApi(apiIMediosPago)
        .then((data) => data.json())
        .then((data) => setMediosPago(data.results))
        .then(() => res(true))
        .catch((error) => console.log(error));
    });
    // Ofertas
    const p2 = new Promise((res, rej) => {
      return getDataFromApi(apiDiscount)
        .then((data) => data.json())
        .then((data) => setOfertas(data.results))
        .then(() => res(true));
    });

    // Intereses
    const p3 = new Promise((res, rej) => {
      return getDataFromApi(apiBanner)
        .then((data) => data.json())
        .then((data) => setIntereses(data.results))
        .then(() => res(true));
    });

    // Banners
    const p4 = new Promise((res, rej) => {
      return getDataFromApi(apiDb)
        .then((data) => data.json())
        .then((data) => setBanner(data.results))
        .then(() => res(true))
        .catch((error) => console.log(error));
    });

    if (lastSaw) {
      localStorage.setItem("lastSaw", JSON.stringify(lastSaw));
      //   localStorage.removeItem("similarSeen");
      const apiVisto = `https://api.mercadolibre.com/sites/MLA/search?category=${
        typeof lastSaw !== "string"
          ? lastSaw?.filters[0]?.values[0]?.id
          : lastSaw
      }`;

      getDataFromApi(apiVisto)
        .then((data) => data.json())
        .then((data) => {
          setVisto(data.results.reverse());
          return data;
        })
        .then((data) => {
          getDataFromApi(
            `https://api.mercadolibre.com/sites/MLA/search?category=${data.filters[0].values[0].path_from_root[0].id}`
          )
            .then((data) => data.json())
            .then((data) => {
              setSimilarSeen(data.results.reverse());
              return data.results.reverse();
            })
            .then((data) =>
              localStorage.setItem("similarSeen", JSON.stringify(data))
            );
        })
        .catch((error) => console.log(error));
    }

    Promise.all([p1, p2, p3, p4]).then(() => {
      setSpinnerLoader(false);
    });

    return () => {
      window.removeEventListener("click", handleClickCard);
    };
  }, [lastSaw]);

  const cardsCreator = (titulo, verMas) => {
    return {
      title: titulo,
      more: verMas,
    };
  };

  return (
    <>
      {spinnerLoader ? (
        <SpinnerLoader loadPage={true} />
      ) : (
        <>
          <Swiper
            id="slider"
            tag="section"
            spaceBetween={0}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
          >
            {banner.length > 0
              ? banner.map((rutaImg) => (
                  <SwiperSlide key={rutaImg.id}>
                    <img src={rutaImg.url} alt="Imágen Slider"></img>
                  </SwiperSlide>
                ))
              : null}
          </Swiper>

          <MediosPago mediosPago={mediosPago} />

          <Cards
            productos={ofertas}
            user={user}
            title={cardsCreator("Ofertas", "todas").title}
            verMas={cardsCreator("Ofertas", "todas").more}
            priceBefore={true}
            handleClickCard={handleClickCard}
            history={history}
            handleExistUserFav={handleExistUserFav}
            id="ofertas"
            itemSeen={itemSeen}
            fav={fav}
            deleteFavUser={deleteFavUser}
          />

          <Cards
            productos={similarSeen ? similarSeen : intereses}
            user={user}
            title={cardsCreator("También puede interesarte", "historial").title}
            verMas={cardsCreator("También puede interesarte", "historial").more}
            handleClickCard={handleClickCard}
            history={history}
            handleExistUserFav={handleExistUserFav}
            itemSeen={itemSeen}
            fav={fav}
            deleteFavUser={deleteFavUser}
          />

          <Cards
            productos={lastSaw ? visto : "No has visto nada aún"}
            user={user}
            title={
              cardsCreator("Basado en tu última visita", "historial").title
            }
            verMas={
              cardsCreator("Basado en tu última visita", "historial").more
            }
            handleClickCard={handleClickCard}
            history={history}
            handleExistUserFav={handleExistUserFav}
            itemSeen={itemSeen}
            fav={fav}
            deleteFavUser={deleteFavUser}
          />
        </>
      )}
    </>
  );
};

export default React.memo(Main);
