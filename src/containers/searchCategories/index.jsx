import Search from "../search";
import { useContext, useEffect } from "react";
import { UserSearchData } from "../../context/UserSearchData";
import { useParams } from "react-router";

const SearchCategorie = () => {
  const { category, setSearchCategory, searchCategory } = useContext(
    UserSearchData
  );
  const { categorie } = useParams();

  useEffect(() => {
    setSearchCategory(categorie);
  }, []);

  return <Search searchCategory={searchCategory} />;
};

export default SearchCategorie;
