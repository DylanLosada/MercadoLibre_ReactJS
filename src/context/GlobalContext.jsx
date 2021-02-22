import {createContext, useState, useEffect} from 'react'

export const GlobalContext = createContext();

export const GlobalExportContext = ({children}) => {

    // state para la busqueda.
    const [search, setSearch] = useState('');

    // State para el carrito.
    const [carrito, setCarrito] = useState([])

    useEffect(() => {

        JSON.parse(localStorage.getItem('carrito')) ? setCarrito(JSON.parse(localStorage.getItem('carrito'))) : setCarrito(carrito);
        console.log(carrito);

    }, [])

    class Producto{
        constructor(id, name, price, img, quantity, off = null, old_price = null, stock, original_price){
            this.id = id;
            this.name = name;
            this.price = price;
            this.img = img;
            this.quantity = quantity;
            this.off = off;
            this.old_price = old_price;
            this.stock = stock;
            this.original_price = original_price;
        }
    }

    return <GlobalContext.Provider value = {{search, setSearch, carrito, setCarrito, Producto}}>
            {children}
    </GlobalContext.Provider>
}