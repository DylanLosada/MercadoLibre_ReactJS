// import {useState} from 'react';
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { priceProduct } from "../../../modules/priceProduct";
import React from "react";
import Hearts from "../../../components/hearts";

// Libreria Swiper para sliders
import SwiperCore, { Navigation, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

// install Swiper components
SwiperCore.use([Navigation, Scrollbar, A11y]);

const Cards = ({
  productos,
  title,
  handleClickCard,
  detailProduct = false,
  user = false,
  handleExistUser = null,
  history = false,
  handleExistUserFav,
  id = null,
  itemSeen,
  fav,
  deleteFavUser,
}) => {
  const cutTitle = (string) => string.slice(0, 50);
  console.log(user);

  return (
    <>
      <section
        id={id ? id : null}
        className={`section ${detailProduct ? "" : "p-11"}`}
      >
        <div className={`section__title ${detailProduct ? "ml-0" : ""}`}>
          <div className="section__title-container">
            <h1 className="section__title-container-h1">{title}</h1>
          </div>
        </div>

        <div
          className={`section__container ${
            detailProduct && "section__container--detailProduct"
          }`}
        >
          {productos.length > 0 && typeof productos === "object" ? (
            <Swiper
              id="sliderOfertas"
              className="overflow-hidden"
              tag="div"
              spaceBetween={1}
              slidesPerView={detailProduct ? 4 : 5}
              slid
              navigation
            >
              {productos.map((producto, index) => (
                <SwiperSlide
                  key={index}
                  className={`sliderOfertas__slider ${
                    detailProduct ? "sliderOfertas__slide--detailProduct" : ""
                  }
                                                flex-row flex justify-between items-stretch`}
                >
                  <Card className="sliderOfertas__slider-cards">
                    <div
                      className="linkCard h-full flex flex-column"
                      onClick={() => {
                        handleClickCard(producto.id, history);
                        itemSeen(producto);
                      }}
                    >
                      <Hearts
                        fav={fav}
                        item={producto}
                        handleExistUserFav={handleExistUserFav}
                        deleteFavUser={deleteFavUser}
                        user={user}
                        history={history}
                      />

                      <Card.Img
                        className="sliderOfertas__slider-cards-img img-fluid"
                        variant="top"
                        src={producto.thumbnail}
                      />
                      <Card.Body
                        className={`sliderOfertas__slider-cards-body ${
                          detailProduct
                            ? "sliderOfertas__slider-cards-body--detailProduct"
                            : ""
                        }`}
                      >
                        <div className="sliderOfertas__slider-cards-body-shipping">
                          <svg
                            className="sliderOfertas__slider-cards-body-shipping-logo"
                            viewBox="0 0 39 32"
                          >
                            <path
                              d="M21.7 24q.6-1.3 2-2t2.6-.8q1.5 0 2.7.7t2 2h4.4v-7.5L30 10.3h-4.8V6.8h5.6q.5 0 .8.2t.6.5l6.2 7.4q.3 0 .4.3t0 
                                                        .6v9.6q0 .7-.5 1.2t-1 .4h-6q-.4 1.8-1.8 3t-3.2 1-3.3-1-1.7-3h-6q-.4 1.8-1.8 3t-3.2 1-3.3-1-1.7-3H1.7Q1 27.4.5 27T0 
                                                        25.6V4q0-1.7 1.2-2.8T4 0h17.2q1.6 0 2.8 1.2T25.2 4v14.3h-3.5V4q0-.2-.2-.4t-.3-.2H4q-.3 0-.4.2t-.2.4v20h2.3q.6-1.3 
                                                        2-2t2.6-.8q1.5 0 2.7.7t2 2h6.7zm4.6 4q.7 0 1.2-.5t.5-1.2-.5-1.2-1.2-.3-1.2.5-.3 1.3.5 1.2 1.3.5zm-16 0q.7 0 1.2-.5t.5-1.2-.5-1.2-1.2-.3T9 
                                                        25t-.4 1.3.5 1.2 1.4.5z"
                            ></path>
                          </svg>
                        </div>
                        {producto.original_price ? (
                          <Card.Subtitle className="sliderOfertas__slider-cards-body-priceBefore">
                            $ {producto.original_price}
                          </Card.Subtitle>
                        ) : null}
                        <Card.Text
                          className={`sliderOfertas__slider-cards-body-priceAfter ${
                            detailProduct
                              ? "sliderOfertas__slider-cards-body-priceAfter--detailProduct"
                              : ""
                          }`}
                        >
                          <span>$</span>
                          <span>
                            {priceProduct(String(producto.price.toFixed(0)))}
                          </span>
                          {producto.original_price ? (
                            <span className="sliderOfertas__slider-cards-body-priceAfter-off">
                              {(
                                100 -
                                (Number(producto.price) /
                                  Number(producto.original_price)) *
                                  100
                              ).toFixed(0)}
                              % OFF
                            </span>
                          ) : null}
                        </Card.Text>
                        {producto.original_price ? (
                          <Card.Subtitle className="sliderOfertas__slider-cards-body-cuotas">
                            {`${producto.installments.quantity} X $ ${producto.installments.amount}`}{" "}
                            sin interés
                          </Card.Subtitle>
                        ) : null}
                        <Card.Title
                          className={`sliderOfertas__slider-cards-body-name ${
                            detailProduct
                              ? "sliderOfertas__slider-cards-body-name--detailProduct"
                              : ""
                          }`}
                        >
                          {cutTitle(producto.title)}
                        </Card.Title>
                      </Card.Body>
                    </div>
                    {detailProduct ? (
                      <p
                        className="sliderOfertas__slider-cards-body-addCarrito"
                        onClick={() => handleExistUser(user, producto, history)}
                      >
                        Agregar al carrito
                      </p>
                    ) : null}
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <h2 className="noSaw">{productos}</h2>
          )}
        </div>
      </section>
    </>
  );
};

export default React.memo(Cards);
