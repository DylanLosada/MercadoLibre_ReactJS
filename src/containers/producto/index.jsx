/* eslint-disable default-case */
/* eslint-disable no-undef */
import FormCompra from '../../components/main/formCompra'
import ImageProduct from '../../components/main/imageProduct'

import getDataFromApi from '../../modules/fetch';

import {useEffect, useState, useContext} from 'react';
import {Link, useParams, useHistory} from 'react-router-dom'
import {Spinner} from 'react-bootstrap';
import { GlobalContext } from '../../context/GlobalContext';
import { UserLogin } from '../../context/UserLoginContext';

const Producto = () => {

    // recupero el id del producto para realizar la nueva consulta
    const {idProducto} = useParams();
    const history = useHistory()

    // Cargo el state del producto
    const [producto, setProducto] = useState([])
    const [seller, setSeller] = useState({})
    const [infoProduct, setInfoProduct] = useState('')


    const {search, handleExistUser, cantidaInput, setCantidadInput, stock, setStock, handleClickCard} = useContext(GlobalContext)
    const {user} = useContext(UserLogin)

    useEffect(() => {
        const apiItems = `https://api.mercadolibre.com/items?ids=${idProducto}` 
        getDataFromApi(apiItems)
            .then(data => data.json())
            .then(data => {
                setProducto(data[0].body)
                getDataFromApi(`https://api.mercadolibre.com/sites/MLA/search?seller_id=${data[0].body.seller_id}`)
                    .then(data => data.json())
                    .then(data => setSeller(data))
                return data[0].body
            })
            .then(data => setStock({stock : data.initial_quantity - data.sold_quantity}))
        search.length > 0 && setInfoProduct(search.find(result => result.id === idProducto))
        console.log(producto)
    }, [idProducto])

    return (
        <>
            <section className="section">
                <div className="section__container producto h-auto">
                    {stock !== 0 ?
                        <div className = 'row d-flex flex-row justify-content-between m-0'>
                            <ImageProduct 
                                producto = {producto}
                                seller = {seller}
                                user = {user}
                                handleExistUser = {handleExistUser}
                                cantidaInput = {cantidaInput}
                                setCantidadInput = {setCantidadInput}
                                history = {history}
                                handleClickCard = {handleClickCard}
                            />
                            <FormCompra 
                                producto = {producto}
                                infoProduct = {infoProduct}
                                stock = {stock}
                                user = {user}
                                handleExistUser = {handleExistUser}
                                cantidaInput = {cantidaInput}
                                setCantidadInput = {setCantidadInput}
                                history = {history}
                                seller = {seller}
                            />
                        </div>
                    :   <div className = 'signIn__spinnerContainer'>
                            <Spinner className = 'signIn__spinnerContainer-spinner' animation="border" variant="primary" />
                        </div>}
                </div>
            </section>
        </>
    )
}

export default Producto;
