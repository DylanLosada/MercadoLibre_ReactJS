import { Button, Form } from "react-bootstrap";

const FormField = ({
  button = false,
  putMasCantidad = false,
  stock = false,
  inputEvent = false,
  handleCantidadInput,
  type = "number",
  name,
  ref,
  errors,
  handlePutMasCantidad,
}) => (
  <div
    className="buttonContainer__ul-cantidad-masCantidad-divContainer relative"
    id="inputContainer"
  >
    <div
      id="inputContainer__barra"
      className={`buttonContainer__ul-cantidad-masCantidad-divContainer-barra w-100 ${
        putMasCantidad && "lineBottomSignIn"
      }`}
    ></div>
    <Form.Control
      id="liMasUnidadesInput"
      className={`buttonContainer__ul-cantidad-masCantidad-input ${
        putMasCantidad &&
        "buttonContainer__ul-cantidad-masCantidad-divContainer-barraFocusOnInput"
      }`}
      name={name}
      type={type}
      min={button ? "7" : null}
      max={button ? stock : null}
      ref={ref}
      onChange={(e) => (button ? inputEvent(e) : null)}
      onClick={(e) => handlePutMasCantidad(e)}
    />

    {button ? (
      <Button
        type="button"
        id="buttonSubmitInputCantidad"
        className="absolute buttonContainer__ul-cantidad-masCantidad-buttonSubmit"
        onClick={(e) => handleCantidadInput()}
      >
        <i>{`>`}</i>
      </Button>
    ) : null}
  </div>
);

export default FormField;
