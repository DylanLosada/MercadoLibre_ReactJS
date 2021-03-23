import { useEffect, useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { Form, Button, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { conecctionDb } from "../../utilitis/fireBase";
import { UserLogin } from "../../context/UserLoginContext";
import SpinnerLoader from "../../components/spinnerLoader";
import ErrorInForm from "../../components/log/errorInForm";
import { GlobalContext } from "../../context/GlobalContext";

const SignUp = () => {
  const { register, handleSubmit, watch, errors } = useForm();

  const [errorSignUp, setErrorSignUp] = useState(false);

  const { user, setUser } = useContext(UserLogin);
  const { spinnerLoader, setSpinnerLoader } = useContext(GlobalContext);

  const checkUser = async (userPass, userMail) => {
    setSpinnerLoader(true);
    return await conecctionDb()
      .then((results) => {
        const arrayUsers = results.docs.map((doc) => {
          return Object.assign(doc.data(), { id: doc.id });
        });
        const userLogIn = arrayUsers.find(
          (pass) => pass.password === userPass && pass.email === userMail.trim()
        );
        console.log(userLogIn);
        if (arrayUsers.length > 0 && userLogIn) {
          setUser([userLogIn]);
          errorSignUp && setErrorSignUp(false);
          return localStorage.setItem("user", JSON.stringify(userLogIn));
        } else {
          return setErrorSignUp(true);
        }
      })
      .catch((e) => console.log(e))
      .finally(() => setSpinnerLoader(false));
  };

  const onSubmit = (data) => checkUser(data.password, data.email);

  return (
    <section className="section">
      <div
        className={`section__container ${
          spinnerLoader && "d-flex aligm-items-stretch"
        }`}
      >
        {!spinnerLoader ? (
          <Form
            className="signUp d-flex flex-column align-items-center"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Form.Row className="signUp__formContainer flex-column align-items-center w-75">
              <h1 className="signUp__formContainer-title">
                ¡Hola! Para seguir, ingresá los siguientes datos
              </h1>

              <Form.Group className="w-100">
                <Form.Label className="mb-0">E-mail</Form.Label>
                <div className="buttonContainer__ul-cantidad-masCantidad-divContainer relative">
                  <div
                    id="inputContainer__barra"
                    className="buttonContainer__ul-cantidad-masCantidad-divContainer-barra w-100 lineBottomSignIn"
                  ></div>
                  <Form.Control
                    className="buttonContainer__ul-cantidad-masCantidad-input"
                    name="email"
                    type="email"
                    ref={register({ required: true, minLength: 10 })}
                  />
                  {errors.email && errors.email.type === "required" && (
                    <span>Este campo es obligatorio</span>
                  )}
                  {errors.email && errors.email.type === "minLength" && (
                    <span>La longitud debe ser mayor a 10</span>
                  )}
                </div>
              </Form.Group>

              <Form.Group className="w-100 mt-5">
                <Form.Label className="mb-0">Clave</Form.Label>
                <div className="buttonContainer__ul-cantidad-masCantidad-divContainer relative">
                  <div
                    id="inputContainer__barra"
                    className="buttonContainer__ul-cantidad-masCantidad-divContainer-barra w-100 lineBottomSignIn"
                  ></div>
                  <Form.Control
                    className="buttonContainer__ul-cantidad-masCantidad-input"
                    name="password"
                    type="password"
                    ref={register({
                      required: true,
                      minLength: 6,
                      maxLength: 20,
                    })}
                  />
                  {errors.password && errors.password.type === "required" && (
                    <span>Este campo es obligatorio</span>
                  )}
                  {errors.password &&
                    (errors.password.type === "minLength" ||
                      errors.password.type === "maxLength") && (
                      <span>La longitud debe ser mayor a 6 y menor que 21</span>
                    )}
                </div>
              </Form.Group>
            </Form.Row>

            {errorSignUp ? (
              <ErrorInForm
                error_1={true}
                msg_1="El E-mail y/o la contraseña no son correctos"
              />
            ) : null}

            <Form.Row className="signUp__buttonContainer w-75">
              <Button
                type="submit"
                className="signUp__buttonContainer-button w-100"
              >
                Ingresar
              </Button>

              <Link to={"/sign-in"} className="w-100 mt-3">
                <Button
                  className="signUp__buttonContainer-button w-100"
                  variant="outline-info"
                >
                  Crear cuenta
                </Button>
              </Link>
            </Form.Row>
          </Form>
        ) : (
          <SpinnerLoader />
        )}
      </div>

      {user.length > 0 ? <Redirect push to="/" /> : null}
    </section>
  );
};

export default SignUp;
