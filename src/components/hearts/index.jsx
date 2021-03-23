import { Button } from "react-bootstrap";

const Hearts = ({
  fav,
  item,
  handleExistUserFav,
  deleteFavUser,
  user,
  history,
}) => {
  return (
    <>
      <Button
        className={`sliderOfertas__slider-cards-like ${
          fav && fav.find((favorite) => favorite.idFav === item.id) && "d-none"
        }`}
        onClick={(e) => handleExistUserFav(e, user, item, history)}
      >
        <svg class="sliderOfertas__slider-cards-like-heart" viewBox="0 0 36 32">
          <path d="M30.4 16q1.5-1.3 2-2.6t.6-3q0-1.4-.7-3T30.6 5q-1.4-1.2-2.4-1.6T25.8 3q-1.5 0-3 .6t-2.6 2l-2 2-2.3-2q-1.8-1.4-3-2T10.2 3t-2.6.4T5.3 5q-1 .7-1.6 2.4t-.7 3q0 1.4.6 3T5.4 16L18 28l12.4-12zM0 10.5q0-1.7.8-4t2.6-3.8Q5 1.2 6.7.7t3.6-.7q2 0 3.8.8t4 2.7q2-2 4-2.7t4-.8 3.4.6 3.3 2Q34.3 4 35 6.3t1 4-.6 4-3 4L18 32 3.4 18.2Q1 16 .4 13.7T0 10.4z"></path>
        </svg>
      </Button>

      <Button
        className={`sliderOfertas__slider-cards-like sliderOfertas__slider-cards-like--liked ${
          fav && fav.find((favorite) => favorite.idFav === item.id) && "d-block"
        }`}
        onClick={(e) => deleteFavUser(e, user[0].id, item.id)}
      >
        <svg class="sliderOfertas__slider-cards-like-heart" viewBox="0 0 36 32">
          <path d="M0 10.4q0-1.7.8-4t2.6-3.8Q5 1.2 6.7.6t3.6-.6q2 0 3.8.8t4 2.7q2-2 4-2.7t4-.8 3.4.6 3.3 2Q34.3 4 35 6.3t1 4-.6 4-3 4L18 32 3.4 18.2Q1.8 16.7 1 14.7t-1-4.3z"></path>
        </svg>
      </Button>
    </>
  );
};

export default Hearts;
