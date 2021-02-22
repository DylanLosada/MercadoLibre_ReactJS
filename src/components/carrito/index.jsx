import { useContext, useState, useEffect } from 'react'
import { GlobalContext } from '../../context/GlobalContext'
import CarritoCard from './carritoCard'

const Carrito = () => {

    const {carrito, setCarrito, search} = useContext(GlobalContext)

    const [quantity, setQuantity] = useState([])
    console.log(quantity)

    useEffect(() => {
        localStorage.setItem('carrito', JSON.stringify(carrito))
    }, [carrito])

    const addQuantity = (id, string = 'less', stock) => {
       carrito.forEach( (producto, index) => {
           if(producto.id === id){
             
                (producto.quantity  >=  stock) ? producto.quantity = stock : producto.quantity+=1
              
                producto.price = producto.original_price * producto.quantity
                setCarrito([...carrito.filter( deleteItem => deleteItem.id !== id), producto])
                // console.log(carrito.splice(index , 1, producto))
                // // setCarrito([...carrito.splice(index , 1, producto)])
           }
       })
    }

    const lessQuantity = (id) => {
        carrito.forEach( (producto, index) => {
            if(producto.id === id){
              
                (producto.quantity  <=  1) ?  producto.quantity = 1 : producto.quantity -= 1
               
                producto.price = producto.original_price * producto.quantity
                setCarrito([...carrito.filter( deleteItem => deleteItem.id !== id), producto])
            }
        })
     }

    return (
        <section className = 'section'>
            <div className="section__container">
                <ul>
                    <li>
                        <span>
                            Carrito
                        </span>
                    </li>
                </ul>
                {carrito.length > 0 ? 
                    <div>
                        <ul>
                            {carrito.map( producto =>  
                                <li key = {producto.id}>
                                    <CarritoCard
                                        producto = {producto}
                                        carrito = {carrito}
                                        lessQuantity = {lessQuantity}
                                        addQuantity = {addQuantity}
                                        setQuantity = {setQuantity}
                                    />
                                </li>  
                            )}

                        </ul>
                    </div>
                 : <h1>Tu carrito está vacío</h1>}
            </div>
        </section>
    )
}

export default Carrito
