import { Card, Button, Badge } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import React from "react";
import Hearts from "../../hearts";

const CardSearch = ({
  search,
  itemSeen,
  listProducts = false,
  fav,
  deleteFavUser,
  handleExistUserFav,
  user,
  history,
}) => {
  return (
    <>
      {search.length > 0
        ? search.map((item) => (
            <Card
              key={item.id}
              id={item.id}
              className="cardSearch"
              onClick={() => itemSeen && itemSeen(item)}
            >
              <div className="cardSearch__cards">
                <Hearts
                  fav={fav}
                  item={item}
                  handleExistUserFav={handleExistUserFav}
                  deleteFavUser={deleteFavUser}
                  user={user}
                  history={history}
                />

                <Link
                  to={
                    listProducts
                      ? `/producto/${item.id}/${listProducts}`
                      : `/producto/${item.id}`
                  }
                  className="cardSearch__cards-containerImg"
                >
                  <Card.Img
                    className="cardSearch__cards-containerImg-img img-fluid"
                    variant="top"
                    src={item.newImg}
                  />
                </Link>
                <Card.Body className="cardSearch__cards-body">
                  <NavLink
                    to={
                      listProducts
                        ? `/producto/${item.id}/${listProducts}`
                        : `/producto/${item.id}`
                    }
                    className="cardSearch__cards-body-name"
                  >
                    {item.title}
                  </NavLink>
                  {item.original_price ? (
                    <Card.Subtitle className="cardSearch__cards-body-priceBefore">
                      $ {item.original_price}{" "}
                    </Card.Subtitle>
                  ) : null}
                  <Card.Text className="cardSearch__cards-body-price">
                    <span>$</span>
                    <span>{item.price.toFixed(0)}</span>
                    {item.original_price ? (
                      <span className="cardSearch__cards-body-price-off">
                        {(
                          100 -
                          (item.price / item.original_price) * 100
                        ).toFixed(0)}
                        % OFF
                      </span>
                    ) : null}
                  </Card.Text>

                  {/* { item.installments ? item.installments.quantity <= 9 && item.installments.rate === 0 ? <div> <p className = 'cardSearch__cards-body-info-shippingFree'>Hasta {item.installments.quantity} cuotas sin interés</p> </div> : null  : null} */}

                  <div className="cardSearch__cards-body-info">
                    <Card.Subtitle className="cardSearch__cards-body-info-state">
                      {item.condition}
                    </Card.Subtitle>
                    {item.shipping.logistic_type === "fulfillment" ? (
                      <Badge className="cardSearch__cards-body-info-shippingFull">
                        Llega gratis mañana
                      </Badge>
                    ) : null}
                    {item.shipping.free_shipping === false &&
                    !item.shipping.logistic_type === "fulfillment" ? (
                      <p className="cardSearch__cards-body-info-shippingFree">
                        Envío gratis
                      </p>
                    ) : null}
                  </div>
                </Card.Body>
              </div>
            </Card>
          ))
        : null}
    </>
  );
};

export default React.memo(CardSearch);
