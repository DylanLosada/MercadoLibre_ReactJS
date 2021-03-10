/* eslint-disable no-unused-vars */
import {useContext, useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import {Redirect, useHistory} from 'react-router-dom'
import {conecctionDb} from '../../utilitis/fireBase'
import {Form, Button, Spinner} from 'react-bootstrap'
import getDataFromApi from '../../modules/fetch'
import ErrorInForm from '../../components/log/errorInForm'
import { UserLogin } from '../../context/UserLoginContext'

const FormInfoBuyer = () => {

    const {register, handleSubmit, errors } = useForm();
    const history = useHistory()
    const {updateDataUser, user, setUserAdress} = useContext(UserLogin)


    const [provincias, setProvincias] = useState([])
    const [municipios, setMunicipios] = useState([])
    const [partido, setPartido] = useState(false)
    const [done, setDone] = useState(false)

    useEffect(() => {
        getDataFromApi( 'https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre')
            .then(data => data.json())
            .then(data => setProvincias(data.provincias.sort()))
            .catch(e => console.log(e))
    }, [])

    const handleSelectProvincia = (id) => {
        console.log('alo')
        const getLocalidades = `https://apis.datos.gob.ar/georef/api/municipios?provincia=${id}&campos=id,nombre&max=100`
        getDataFromApi(getLocalidades)
            .then(data => data.json())
            .then(data => console.log(data.municipios.sort()))
            .catch(e => console.log(e))
    }

    const handleSelectPartido = () => setPartido(true)

    const onSubmit = data => {
        updateDataUser(Object.values(user)[0].id, data)
        setUserAdress(data);
        history.push('/finish-buy')
    };

    return (
        <section className = 'section'>
            <div className = 'section__container signIn'>
                <h1 className = ''>Completá tus datos de envío</h1>
                {municipios.length > 0 ? console.log(municipios) : console.log(municipios)}
                    <Form 
                        className = 'signIn__form w-100'
                        onSubmit = {handleSubmit(onSubmit)}
                    >
                        <Form.Row className = 'signIn__form-container align-items-center'>
                            <Form.Row className = 'justify-content-start w-100 mb-5'>
                                <Form.Group className = 'signIn__form-container-field col-xl-8'>
                                    <Form.Label className = 'mb-0 signIn__form-container-field-label'>Dirección</Form.Label>
                                    <div 
                                        className = 'buttonContainer__ul-cantidad-masCantidad-divContainer relative'
                                    >
                                        <div id='inputContainer__barra' className = 'buttonContainer__ul-cantidad-masCantidad-divContainer-barra w-100 lineBottomSignIn'></div>
                                        <Form.Control
                                            className = 'buttonContainer__ul-cantidad-masCantidad-input' 
                                            name = 'adress'
                                            type= 'text'
                                            ref = {register({ required: true, minLength: 2})}
                                        />
                                    </div>
                                    {errors.adress && errors.adress.type === 'required' && (<span>Este campo es obligatorio</span>)}
                                    {errors.adress && errors.adress.type === 'minLength' && (<span>La longitud debe ser mayor a 2</span>)}
                                    {errors.adress && errors.adress.type === 'validate' && (<span>No puede poseer números</span>)}
                                </Form.Group>

                                <Form.Group className ='signIn__form-container-field ml-5 col-xl-2'>
                                    <Form.Label className = 'mb-0 signIn__form-container-field-label'>Depto.</Form.Label>
                                    <div 
                                        className = 'buttonContainer__ul-cantidad-masCantidad-divContainer relative'
                                    >
                                        <div id='inputContainer__barra' className = 'buttonContainer__ul-cantidad-masCantidad-divContainer-barra w-100 lineBottomSignIn'></div>
                                        <Form.Control
                                            className = 'buttonContainer__ul-cantidad-masCantidad-input' 
                                            name = 'depto'
                                            type= 'text'
                                            placeholder = 'opcional'
                                            ref = {register({maxLength: 1})}
                                        />
                                    </div>
                                    {errors.depto && errors.depto.type === 'required' && (<span>Este campo es obligatorio</span>)}
                                    {errors.depto && errors.depto.type === 'minLength' && (<span>La longitud debe ser igual a 1</span>)}
                                    {errors.depto && errors.depto.type === 'validate' && (<span>No puede poseer números</span>)}
                                </Form.Group>

                                <Form.Group className ='signIn__form-container-field ml-5 col-xl-2 d-flex justify-content-between flex-column'>
                                    <Form.Label className = 'mb-0 signIn__form-container-field-label'>Piso</Form.Label>
                                    <div 
                                        className = 'buttonContainer__ul-cantidad-masCantidad-divContainer relative'
                                    >
                                        <div id='inputContainer__barra' className = 'buttonContainer__ul-cantidad-masCantidad-divContainer-barra w-100 lineBottomSignIn'></div>
                                        <Form.Control
                                            className = 'buttonContainer__ul-cantidad-masCantidad-input' 
                                            name = 'floor'
                                            type= 'number'
                                            ref = {register({required: true, maxLength: 1})}
                                        />
                                    </div>
                                    {errors.floor && errors.floor.type === 'required' && (<span>obligatorio</span>)}
                                    {errors.floor && errors.floor.type === 'minLength' && (<span>La longitud debe ser igual a 1</span>)}
                                    {errors.floor && errors.floor.type === 'validate' && (<span>No puede poseer letras</span>)}
                                </Form.Group>
                            </Form.Row>

                            <Form.Row className = 'w-100 justify-content-start mb-5'>
                                <Form.Group className ='signIn__form-container-field col-xl-4'>
                                    <Form.Label className = 'mb-0 signIn__form-container-field-label'>Altura</Form.Label>
                                    <div 
                                        className = 'buttonContainer__ul-cantidad-masCantidad-divContainer relative'
                                    >
                                        <div id='inputContainer__barra' className = 'buttonContainer__ul-cantidad-masCantidad-divContainer-barra w-100 lineBottomSignIn'></div>
                                        <Form.Control 
                                            name = 'altura'
                                            className = 'buttonContainer__ul-cantidad-masCantidad-input' 
                                            type = 'number'
                                            ref = {register({required: true, minLength: 1})}
                                        />
                                    </div>
                                    {errors.altura && errors.altura.type === 'required' && (<span>Este campo es obligatorio</span>)}
                                    {errors.altura && errors.altura.type === 'minLength' && (<span>La longitud debe ser mayor o igual a 1</span>)}
                                    {errors.altura && errors.altura.type === 'validate' && (<span>No puede poseer letras</span>)}
                                </Form.Group>
                            </Form.Row>

                            <Form.Row className = 'w-100 justify-content-start mb-5'>
                                <Form.Group className ='signIn__form-container-field col-xl-4'>
                                    <Form.Label className = 'mb-0 signIn__form-container-field-label'>Provincia</Form.Label>
                                    <div 
                                        className = 'buttonContainer__ul-cantidad-masCantidad-divContainer relative'
                                    >
                                        <div id='inputContainer__barra' className = 'buttonContainer__ul-cantidad-masCantidad-divContainer-barra w-100 lineBottomSignIn'></div>
                                        <Form.Control as = 'select' className = 'buttonContainer__ul-cantidad-masCantidad-input' name = 'provincia'>
                                                {provincias.length > 0 ? provincias.map( provincia => 
                                                    <option 
                                                        key = {provincia.id}
                                                        onClick = {() => handleSelectProvincia(provincia.id)}
                                                        value = {provincia.name}
                                                    >{provincia.nombre}</option>    
                                                ) : null}
                                        </Form.Control>
                                    </div>
                                    {errors.provincia && errors.provincia.type === 'required' && (<span>Este campo es obligatorio</span>)}
                                </Form.Group>

                                <Form.Group className ='signIn__form-container-field col-xl-4 ml-3'>
                                    <Form.Label className = 'mb-0 signIn__form-container-field-label'>Localidad</Form.Label>
                                    <div 
                                        className = 'buttonContainer__ul-cantidad-masCantidad-divContainer relative'
                                    >
                                        <div id='inputContainer__barra' className = 'buttonContainer__ul-cantidad-masCantidad-divContainer-barra w-100 lineBottomSignIn'></div>
                                        <Form.Control 
                                            name = 'localidad'
                                            as = 'select' 
                                            className = 'buttonContainer__ul-cantidad-masCantidad-input'
                                            disabled = {municipios.length > 0 ? false : true}
                                        >
                                            {municipios.length > 0 ? municipios.map( municipio => 
                                                    <option 
                                                        key = {municipio.id}
                                                        onClick = {() => handleSelectPartido()}
                                                    >{municipio.nombre}</option>    
                                                ) : null}
                                        </Form.Control>
                                    </div>
                                    {errors.localidad && errors.localidad.type === 'required' && (<span>Este campo es obligatorio</span>)}
                                </Form.Group>

                                <Form.Group className ='signIn__form-container-field col-xl-3 ml-3'>
                                    <Form.Label className = 'mb-0 signIn__form-container-field-label'>Partido</Form.Label>
                                    <div 
                                        className = 'buttonContainer__ul-cantidad-masCantidad-divContainer relative'
                                    >
                                        <div id='inputContainer__barra' className = 'buttonContainer__ul-cantidad-masCantidad-divContainer-barra w-100 lineBottomSignIn'></div>
                                        <Form.Control 
                                            name = 'partido'
                                            className = 'buttonContainer__ul-cantidad-masCantidad-input' 
                                            type = 'text' 
                                            disabled = {partido ? false : true}
                                            ref = {register({required: true, minLength: 2})}
                                        />
                                    </div>
                                    {errors.partido && errors.partido.type === 'required' && (<span>Este campo es obligatorio</span>)}
                                    {errors.partido && errors.partido.type === 'minLength' && (<span>La longitud debe ser mayor o igual a 2</span>)}
                                    {errors.partido && errors.partido.type === 'validate' && (<span>No puede poseer números</span>)}
                                </Form.Group>
                            </Form.Row>

                            <Form.Row className = 'w-100 justify-content-between signIn__form-container-field mt-5'>
                                <Form.Group className = 'col-xl-4'>
                                    <Form.Label className = 'mb-0 signIn__form-container-field-label'>Código postal</Form.Label>
                                    <div 
                                        className = 'buttonContainer__ul-cantidad-masCantidad-divContainer relative'
                                    >
                                        <div id='inputContainer__barra' className = 'buttonContainer__ul-cantidad-masCantidad-divContainer-barra w-100 lineBottomSignIn'></div>
                                        <Form.Control
                                            className = 'buttonContainer__ul-cantidad-masCantidad-input' 
                                            name = 'postCode'
                                            type= 'number'
                                            ref = {register({ required: true, minLength: 3, maxLength: 5 })}
                                        />
                                    </div>
                                    {errors.postCode && errors.postCode.type === 'required' && (<span>Este campo es obligatorio</span>)}
                                    {errors.postCode && errors.postCode.type === 'minLength' && (<span>La longitud debe ser mayor a 2</span>)}
                                    {errors.postCode && errors.postCode.type === 'maxLength' && (<span>La longitud debe ser menor o igual a 5</span>)}
                                </Form.Group>
                            </Form.Row>
                            
                        </Form.Row>

                        <Form.Row className = 'signIn__buttonContainer m-0'>
                            <Button className = 'signIn__buttonContainer-button' type = 'submit'>Guardar</Button>
                        </Form.Row> 
                    
                    </Form>
            </div>
            {user.length > 0 ? null : <Redirect push to = '/'></Redirect>}
        </section>
    )
}

export default FormInfoBuyer
