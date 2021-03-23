import CardSearch from "../../components/search/cardsSearch";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { UserSearchData } from "../../context/UserSearchData";
import { UserLogin } from "../../context/UserLoginContext";

const Historial = () => {
  const { historial } = useContext(UserSearchData);
  const { handleExistUserFav, user, fav, deleteFavUser } = useContext(
    UserLogin
  );

  const history = useHistory();

  return (
    <section className="section h-auto">
      <div className="section__container historial h-auto">
        <h1 className="historial__title">Tu historial</h1>
        <CardSearch
          search={historial}
          itemSeen={false}
          handleExistUserFav={handleExistUserFav}
          user={user}
          history={history}
          fav={fav}
          deleteFavUser={deleteFavUser}
        />
      </div>
    </section>
  );
};

export default Historial;
