import FormCompra from '../../components/main/formCompra'
import ImageProduct from '../../components/main/imageProduct'

import getDataFromApi from '../../modules/fetch';

import {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom'

const Producto = () => {

    // recupero el id del producto para realizar la nueva consulta
    const {idProducto} = useParams();
    console.log(idProducto);

    // Cargo el state del producto
    const [producto, setProducto] = useState([])

    useEffect(() => {
        const apiItems = `https://api.mercadolibre.com/items?ids=${idProducto}` 
        getDataFromApi(apiItems)
            .then(data => data.json())
            .then(data => setProducto(data[0].body))
    }, [idProducto])

    return (
        <>
            <section className="section">
                <div className="section__container producto">
                    <div className = 'row d-flex flex-row justify-content-between'>
                        <ImageProduct 
                            producto = {producto}
                        />
                        <FormCompra 
                            producto = {producto}
                        />
                    </div>
                </div>
            </section>
        </>
    )
}

export default Producto;
