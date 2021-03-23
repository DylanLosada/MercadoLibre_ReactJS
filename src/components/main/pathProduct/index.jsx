import { Link } from "react-router-dom";

const PathProduct = ({ pathProduct, listProducts }) => {
  return (
    <div className="pathProduct">
      {pathProduct.length > 0
        ? pathProduct.map((path, index, array) => (
            <>
              {index === 0 && listProducts ? (
                <div className="pathProduct__containerLinks">
                  <Link
                    className="pathProduct__containerLinks-link"
                    to={`/search/${listProducts}`}
                  >
                    {"Volver al listado"}
                  </Link>

                  <span className="pathProduct__containerLinks-concat">
                    {">"}
                  </span>
                </div>
              ) : null}

              <div className="pathProduct__containerLinks">
                <Link
                  className="pathProduct__containerLinks-link"
                  to={`/search/${path}`}
                >
                  {path}
                </Link>
                {index !== array.length - 1 && (
                  <span className="pathProduct__containerLinks-concat">
                    {">"}
                  </span>
                )}
              </div>
            </>
          ))
        : null}
    </div>
  );
};

export default PathProduct;
