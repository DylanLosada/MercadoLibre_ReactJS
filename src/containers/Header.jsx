// Importo fetch
import getDataFromApi from '../modules/fetch';

import {useEffect, useState} from 'react'

import Logo from '../components/header/logo';
import NavBar from './navBar';
import Envios from '../components/header/envios';
import Searcher from '../components/header/searcher';

const imgLocation = './assets/iconos/ubicacion.svg';
const imgLupa = './assets/iconos/lupa.svg';
const imgCarrito = './assets/iconos/carrito.svg';

const apiMlCategorias = 'https://api.mercadolibre.com/sites/MLA/categories?limit=10'

const Header = ({setCarrito, carrito}) => {

    // Uso el state para generar categorias y subCategorias.
    const [categorias, setCategorias] = useState([]);


    useEffect(() => {
       // Categorías
       getDataFromApi(apiMlCategorias)
                .then(data => data.json())
                .then(data => setCategorias(data.splice(0, 15)))
                .catch(error => console.log(error));
        
    }, [])
    
    return ( 
        <header id = 'header' className = 'container-2xl'>
            <div className = 'header__container flex flex-row flex-wrap'>
            {carrito.length > 0 ? console.log(carrito) : console.log(typeof carrito)}
                <Logo /> 
                <Searcher
                    imgLupa = {imgLupa}
                />
                <Envios />
                <NavBar 
                    imgLocation = {imgLocation}
                    imgCarrito = {imgCarrito}
                    carrito = {carrito}
                    setCarrito = {setCarrito}
                    categorias = {categorias}
                />
            </div> 
        </header>
     );

}
export default Header;