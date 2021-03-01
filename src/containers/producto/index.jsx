import FormCompra from '../../components/main/formCompra'
import ImageProduct from '../../components/main/imageProduct'

import getDataFromApi from '../../modules/fetch';

import {useEffect, useState, useContext} from 'react';
import {Link, useParams} from 'react-router-dom'
import { GlobalContext } from '../../context/GlobalContext';

const Producto = () => {

    // recupero el id del producto para realizar la nueva consulta
    const {idProducto} = useParams();

    // Cargo el state del producto
    const [producto, setProducto] = useState([])
    const [infoProduct, setInfoProduct] = useState('')

    const {search} = useContext(GlobalContext)

    useEffect(() => {
        const apiItems = `https://api.mercadolibre.com/items?ids=${idProducto}` 
        getDataFromApi(apiItems)
            .then(data => data.json())
            .then(data => setProducto(data[0].body))
        search.length > 0 && setInfoProduct(search.find(result => result.id === idProducto))
    }, [idProducto])

    return (
        <>
            <section className="section">
                <div className="section__container producto">
                    <div className = 'row d-flex flex-row justify-content-between m-0'>
                        <ImageProduct 
                            producto = {producto}
                        />
                        <FormCompra 
                            producto = {producto}
                            infoProduct = {infoProduct}
                        />
                    </div>
                </div>
            </section>
        </>
    )
}

export default Producto;
