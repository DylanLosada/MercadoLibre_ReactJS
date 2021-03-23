import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import FormField from "./formField";
import { GlobalContext } from "../../context/GlobalContext";

const stylesClickOnInput = (e) => {
  const input = document.querySelector("#liMasUnidadesInput");
  const inputBarra = document.querySelector("#inputContainer__barra");
  const containerInput = document.querySelector("#inputContainer");

  if (e.target === input) {
    inputBarra.className = "transform scale-0";
    containerInput.classList.add(
      "buttonContainer__ul-cantidad-masCantidad-divContainer-barraFocusOnInput"
    );
  } else {
    if (
      containerInput.classList.contains(
        "buttonContainer__ul-cantidad-masCantidad-divContainer-barraFocusOnInput"
      )
    ) {
      containerInput.classList.remove(
        "buttonContainer__ul-cantidad-masCantidad-divContainer-barraFocusOnInput"
      );
      inputBarra.className =
        "buttonContainer__ul-cantidad-masCantidad-divContainer-barra";
    }
  }
};

const changeInitialValue = (initial) =>
  initial > 0
    ? (document.querySelector(
        "#buttonCantidadUnidades"
      ).textContent = `${initial} unidades`)
    : null;

const ItemCounter = ({
  stock,
  initial,
  producto,
  user,
  handleExistUser,
  history,
  setCantidadFinal,
  cantidadFinal,
}) => {
  // State de cantidad de producto
  const [cantidad, setCantidad] = useState(0);
  const [ulAppear, setUlAppear] = useState(false);
  const [masCantidad, setMasCantidad] = useState(false);
  const [putMasCantidad, setPutMasCantidad] = useState(false);
  const [cantidadInput, setCantidadInput] = useState(7);

  // const history = useHistory()

  // const {Producto, setCarrito, carrito} = useContext(GlobalContext);

  useEffect(() => {
    changeInitialValue(initial);
  }, []);

  const inputEvent = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    if (Number(e.target.value) >= 7 && Number(e.target.value) <= stock.stock) {
      setCantidadInput(e.target.value);
    } else if (
      Number(e.target.value) >= 7 &&
      Number(e.target.value) > stock.stock
    ) {
      setCantidadInput(stock.stock);
    }
  };

  const handleClickCantidadEvent = () =>
    ulAppear ? setUlAppear(false) : setUlAppear(true);

  const handleMasCantidad = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    setMasCantidad(true);
  };

  const handlePutMasCantidad = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    setPutMasCantidad(true);
  };

  const handleCantidadInput = () => setCantidadFinal(Number(cantidadInput));

  const submitForm = (e) => {
    e.preventDefault();
    console.log(cantidadFinal);
  };

  return (
    <div id="buttonContainer" className="rounded-2xl mt-8">
      {stock ? console.log(stock) : null}
      <Form
        className="buttonContainer__form flex flex-col items-start justify-between"
        onSubmit={submitForm}
      >
        <button
          id="buttonCantidad"
          type="button"
          className="buttonContainer__form-botonCantidad flex flex-row justify-between"
          onClick={(e) => handleClickCantidadEvent()}
        >
          <span>Cantidad: </span>
          <span id="buttonCantidadUnidades" className="font-semibold">
            {cantidadFinal === 1
              ? `${cantidadFinal} unidad`
              : `${cantidadFinal} unidades`}
          </span>
          <span>^</span>
          <span className="buttonCantidadUnidades__spanDisponibles">{`(${
            stock ? stock.stock : "..."
          } disponibles)`}</span>

          <ul
            id="choseeCantidad"
            className={`buttonContainer__ul-cantidad ulScaleInitial ${
              ulAppear && "ulAppear"
            }`}
            // onClick = {(e) => ulAppear(e)}
          >
            <li
              className="estilosLi"
              value="1"
              onClick={() => setCantidadFinal(1)}
            >
              1 Unidad
            </li>
            <li value="2" onClick={() => setCantidadFinal(2)}>
              2 Unidades
            </li>
            <li value="3" onClick={() => setCantidadFinal(3)}>
              3 Unidades
            </li>
            <li value="4" onClick={() => setCantidadFinal(4)}>
              4 Unidades
            </li>
            <li value="5" onClick={() => setCantidadFinal(5)}>
              5 Unidades
            </li>
            <li value="6" onClick={() => setCantidadFinal(6)}>
              6 Unidades
            </li>
            <li
              value=""
              id="liMasUnidades"
              className={masCantidad && `liMasUnidades`}
            >
              <span
                id="labelMasUni"
                className={`buttonContainer__ul-cantidad-labelMasUni ${
                  masCantidad && "masProductosTitleDisappear"
                }`}
                onClick={(e) => handleMasCantidad(e)}
              >
                Más de 6 unidades
              </span>
              <Form.Group
                className={`buttonContainer__ul-cantidad-masCantidad relative ${
                  masCantidad && "masProductosAppear"
                }`}
              >
                <Form.Label htmlFor="cantidad">Cantidad:</Form.Label>

                <FormField
                  button={true}
                  putMasCantidad={putMasCantidad}
                  handlePutMasCantidad={handlePutMasCantidad}
                  handleCantidadInput={handleCantidadInput}
                  stock={stock}
                  inputEvent={inputEvent}
                  name="cantidad"
                />
              </Form.Group>
            </li>
          </ul>
        </button>

        <div className="buttonContainer__form-buttonsCompra">
          <Button className="buttonContainer__form-buttons buttonContainer__form-buttons--buttonComprar">
            <span>Comprar ahora</span>
          </Button>

          <Button
            className="buttonContainer__form-buttons buttonContainer__form-buttons--buttonAgregar"
            onClick={() => handleExistUser(user, producto, history)}
          >
            <span>Agregar al carrito</span>
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ItemCounter;
