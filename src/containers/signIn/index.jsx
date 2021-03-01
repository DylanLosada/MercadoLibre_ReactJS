import {useContext} from 'react'
import {useForm} from 'react-hook-form'
import {Redirect} from 'react-router-dom'
import {conecctionDb} from '../../utilitis/fireBase'
import {Form, Button, Spinner} from 'react-bootstrap'
import { UserLogin } from '../../context/UserLoginContext';
import ErrorInForm from '../../components/log/errorInForm'
// import getMayus from '../../modules/getMayus'

const SignIn = () => {

    const {register, handleSubmit, errors } = useForm();

    // const [name, setName] = useState('');
    // const [surname, setSurname] = useState('');
    // const [dni, setDni] = useState('');
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');

    // Obtengo el state del contexto de usuarios
    const {craeteNewUser, spinnerLoader, fileId, errorMail, 
            setErrorMail, errorDni, setErrorDni, user} = useContext(UserLogin);

    const searchNumberInAString = (value) => {
        const arrayString = value.trim().split('');
        let bool = true;

        for(let i = 0; i <= 9; i++){
            if (arrayString.find(index => index === String(i))) {
                bool = false
                break;
            } 
        }
        return bool;
    }

    const getUsersToCampareFields = async (userDni, userMail) => {
        let bool = true
        return await conecctionDb()
            .then((results) => {
                const arrayUsers = results.docs.map(doc => doc.data())
                // console.log(arrayUsers.find(dni => dni.dni === userDni))
                if(arrayUsers.length > 0 && arrayUsers.find(dni => dni.dni === userDni)){
                    bool = false
                    setErrorDni(true);
                }
                if(arrayUsers.length > 0 && arrayUsers.find(mail => mail.email === userMail)){
                    bool = false
                    setErrorMail(true)
                }
    
                return bool;
            })
    }

    const onSubmit = data => (getUsersToCampareFields(data.dni, data.email)) && craeteNewUser(data);

    return (
        <section className = 'section'>
            <div className = 'section__container signIn'>
                <h1 className = ''>{!spinnerLoader ? 'Completá tus datos' : null}</h1>
                {!spinnerLoader ? 
                    <Form 
                    className = 'signIn__form'
                    onSubmit = {handleSubmit(onSubmit)}
                    >
                        <Form.Row className = 'signIn__form-container'>
                            <Form.Row className = 'justify-content-start w-100 mb-5'>
                                <Form.Group className = 'signIn__form-container-field'>
                                    <Form.Label className = 'mb-0 signIn__form-container-field-label'>Nombre</Form.Label>
                                    <div 
                                        className = 'buttonContainer__ul-cantidad-masCantidad-divContainer relative'
                                    >
                                        <div id='inputContainer__barra' className = 'buttonContainer__ul-cantidad-masCantidad-divContainer-barra w-100 lineBottomSignIn'></div>
                                        <Form.Control
                                            className = 'buttonContainer__ul-cantidad-masCantidad-input' 
                                            name = 'name'
                                            type= 'text'
                                            ref = {register({ required: true, minLength: 2, validate: searchNumberInAString })}
                                        />
                                        {errors.name && errors.name.type === 'required' && (<span>Este campo es obligatorio</span>)}
                                        {errors.name && errors.name.type === 'minLength' && (<span>La longitud debe ser mayor a 2</span>)}
                                        {errors.name && errors.name.type === 'validate' && (<span>No puede poseer números</span>)}

                                    </div>
                                </Form.Group>

                                <Form.Group className ='signIn__form-container-field ml-5'>
                                    <Form.Label className = 'mb-0 signIn__form-container-field-label'>Apellido</Form.Label>
                                    <div 
                                        className = 'buttonContainer__ul-cantidad-masCantidad-divContainer relative'
                                    >
                                        <div id='inputContainer__barra' className = 'buttonContainer__ul-cantidad-masCantidad-divContainer-barra w-100 lineBottomSignIn'></div>
                                        <Form.Control
                                            className = 'buttonContainer__ul-cantidad-masCantidad-input' 
                                            name = 'surname'
                                            type= 'text'
                                            ref = {register({ required: true, minLength: 2, validate: searchNumberInAString })}
                                        />
                                        {errors.surname && <span>Este campo es obligatorio</span>}
                                        {errors.surname && errors.surname.type === 'minLength' && (<span>La longitud debe ser mayor a 2</span>)}
                                    </div>
                                </Form.Group>
                            </Form.Row>

                            <Form.Row className = 'w-100 justify-content-start mb-5'>
                                <Form.Group className ='signIn__form-container-field'>
                                    <Form.Label className = 'mb-0 signIn__form-container-field-label'>DNI</Form.Label>
                                    <div 
                                        className = 'buttonContainer__ul-cantidad-masCantidad-divContainer relative'
                                    >
                                        <div id='inputContainer__barra' className = 'buttonContainer__ul-cantidad-masCantidad-divContainer-barra w-100 lineBottomSignIn'></div>
                                        <Form.Control
                                            className = 'buttonContainer__ul-cantidad-masCantidad-input' 
                                            name = 'dni'
                                            type= 'number'
                                            ref = {register({ required: true, minLength: 8 })}
                                        />
                                        {errors.dni && <span>Este campo es obligatorio</span>}
                                        {errors.dni && errors.dni.type === 'minLength' && (<span>La longitud debe ser mayor a 7</span>)}
                                    </div>

                                </Form.Group>
                            </Form.Row>
                            
                            <Form.Row className = 'w-100 justify-content-start'>
                                <Form.Group className ='signIn__form-container-field'>
                                    <Form.Label className = 'mb-0 signIn__form-container-field-label'>E-mail</Form.Label>
                                    <div 
                                        className = 'buttonContainer__ul-cantidad-masCantidad-divContainer relative'
                                    >
                                        <div id='inputContainer__barra' className = 'buttonContainer__ul-cantidad-masCantidad-divContainer-barra w-100 lineBottomSignIn'></div>
                                        <Form.Control
                                            className = 'buttonContainer__ul-cantidad-masCantidad-input' 
                                            name = 'email'
                                            type= 'email'
                                            ref = {register({ required: true, minLength: 6, maxLength: 20 })}
                                        />
                                    </div>
                                    {errors.email && <span>Este campo es obligatorio</span>}
                                </Form.Group>

                                <Form.Group className ='signIn__form-container-field ml-5'>
                                    <Form.Label className = 'mb-0 signIn__form-container-field-label'>Clave</Form.Label>
                                    <div 
                                        className = 'buttonContainer__ul-cantidad-masCantidad-divContainer relative'
                                    >
                                        <div id='inputContainer__barra' className = 'buttonContainer__ul-cantidad-masCantidad-divContainer-barra w-100 lineBottomSignIn'></div>
                                        <Form.Control
                                            className = 'buttonContainer__ul-cantidad-masCantidad-input' 
                                            name = 'password'
                                            type= 'password'
                                            ref = {register({ required: true, minLength: 6, maxLength: 20 })}
                                        />
                                        {errors.password && <span>Este campo es obligatorio</span>}
                                        {errors.password && errors.password.type === 'minLength' && (<span>La longitud debe ser mayor a 5</span>)}
                                        {errors.password && errors.password.type === 'maxLength' && (<span>La longitud debe ser menor o igual a 20</span>)}
                                    </div>
                                </Form.Group>
                            </Form.Row>

                            <Form.Row className = 'w-100 justify-content-between signIn__form-container-field signIn__form-container-field--marginTop'>
                                <Form.Check
                                    name = 'agree'
                                    ref = {register({ required: true})}
                                ></Form.Check>
                                <Form.Label>
                                    Acepto los Términos y Condiciones y autorizo 
                                    el uso de mis datos de acuerdo a la Declaración de Privacidad.
                                </Form.Label>
                                {errors.agree && errors.agree.type === 'required' && (<span>Este campo es obligatorio</span>)}
                            </Form.Row>

                            {(fileId) ? null : 
                                <ErrorInForm 
                                    error_1 = {true}
                                    msg_1 = 'Ocurrio un error en la creacion del usurio. Por favor, intentelo mas tarde'
                                /> 
                            } 

                            {(errorMail || errorDni) ? 
                                <ErrorInForm 
                                    error_1 = {errorMail}
                                    error_2 = {errorDni}
                                    msg_1 = 'El E-mail ya existe'
                                    msg_2 = 'El DNI ya existe'
                                /> 
                            : null} 
                            
                        </Form.Row>

                        <Form.Row className = 'signIn__buttonContainer m-0'>
                            <Button className = 'signIn__buttonContainer-button' type = 'submit'>Continuar</Button>
                        </Form.Row> 
                    
                    </Form>
                : <div className = 'signIn__spinnerContainer'>
                    <Spinner className = 'signIn__spinnerContainer-spinner' animation="border" variant="primary" />
                </div>}
            </div>

            {user.length > 0 ?
                <Redirect 
                   push to = {'/'}
                /> 
            : null}
        </section>
    )
}

export default SignIn
