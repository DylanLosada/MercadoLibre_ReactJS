import {createContext, useState, useEffect} from 'react'

export const GlobalContext = createContext();

export const GlobalExportContext = ({children}) => {

    // state para la busqueda.
    const [search, setSearch] = useState('');

    // State para el carrito.
    const [carrito, setCarrito] = useState([])

    const [quantity, setQuantity] = useState([])

    useEffect(() => {
        if(carrito.length === 0){
            (JSON.parse(localStorage.getItem('carrito'))) ? setCarrito(JSON.parse(localStorage.getItem('carrito'))) : setCarrito(carrito);
        }
        else if( carrito.length > 0){
            localStorage.setItem('carrito', JSON.stringify(carrito))
        }
    }, [carrito])

    const addQuantity = (id, stock) => {
       carrito.forEach( producto => {
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

    const deleteProduct = (productId) => {
        const newCarrito = carrito.filter( producto => producto.id !== productId)
        setCarrito(newCarrito)
        console.log(newCarrito)
        if(newCarrito.length === 0){
            localStorage.removeItem('carrito')
        } else{
            localStorage.setItem('carrito', JSON.stringify(newCarrito))
        }
    }

    class Producto{
        constructor(id, name, price, img, quantity, off = null, old_price = null, stock, original_price, free_shipping, logistic_type){
            this.id = id;
            this.name = name;
            this.price = price;
            this.img = img;
            this.quantity = quantity;
            this.off = off;
            this.old_price = old_price;
            this.stock = stock;
            this.original_price = original_price;
            this.free_shipping = free_shipping;
            this.logistic_type = logistic_type;
        }
    }

    return <GlobalContext.Provider value = {{search, setSearch, carrito, setCarrito, Producto, quantity, setQuantity, addQuantity, 
                                            lessQuantity, deleteProduct}}>
            {children}
    </GlobalContext.Provider>
}