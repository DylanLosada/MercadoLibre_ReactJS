import { Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import getDataFromApi from "../../modules/fetch";

const OficialIndex = () => {
  const [blueBorder, setBlueBorder] = useState(false);
  const [searchStore, setSearchStore] = useState("");

  useEffect(() => {
    if (searchStore.length > 0) {
    }
  }, [searchStore]);

  const handleBorder = (e) => {
    // e.preventDefault();
    // e.stopImmediatePropagation();
    // e.nativeEvent.stopImmediatePropagation();
    setBlueBorder(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(searchStore.toUpperCase());
    const apiOficialStores = `https://api.mercadolibre.com/sites/MLA/search?nickname=${searchStore}`;
    await getDataFromApi(apiOficialStores)
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        getDataFromApi(
          `https://api.mercadolibre.com/sites/MLA/search?seller_id=${data.seller?.id}`
        )
          .then((data) => data.json())
          .then((data) => console.log(data));
      });
  };

  const searchFunction = (e) => {
    let get = "";
    let text = e.target.value;

    if (text.includes(" ")) {
      get += text.split(" ").join("-");
    } else {
      get += text;
    }

    setSearchStore(get);
  };

  return (
    <section className="section">
      <div className="section__container oficialStore">
        <Form
          className="oficialStore__formContainer"
          onSubmit={(e) => handleSubmit(e)}
        >
          <Form.Group className="oficialStore__formContainer-inputContainer relative">
            <Form.Label className="oficialStore__formContainer-inputContainer-lupa">
              <i class="fas fa-search"></i>
            </Form.Label>
            <Form.Control
              className="oficialStore__formContainer-inputContainer-input"
              placeholder="Buscar tiendas"
              onClick={(e) => handleBorder(e)}
              onChange={(e) => searchFunction(e)}
            ></Form.Control>
            <div
              className={`absolute oficialStore__formContainer-inputContainer-hover ${
                blueBorder ? "blueBorder" : null
              }`}
            ></div>
          </Form.Group>
        </Form>

        <div></div>
      </div>
    </section>
  );
};

export default OficialIndex;
