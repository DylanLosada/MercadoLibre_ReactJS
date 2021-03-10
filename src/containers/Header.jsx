// Importo fetch
import getDataFromApi from '../modules/fetch';

import {useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'

import Logo from '../components/header/logo';
import NavBar from './navBar';
import Envios from '../components/header/envios';
import Searcher from '../components/header/searcher';
import HeaderSignUp from '../components/header/headerSignUp'
import { UserLogin } from '../context/UserLoginContext';
import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';

const imgLocation = './assets/iconos/ubicacion.svg';
const imgLupa = './assets/iconos/lupa.svg';
const imgCarrito = './assets/iconos/carrito.svg';

const apiMlCategorias = 'https://api.mercadolibre.com/sites/MLA/categories?limit=10'

const Header = ({setItemSearch}) => {

    // Uso el state para generar categorias y subCategorias.
    const [categorias, setCategorias] = useState([]);

    const location = useLocation().pathname;

    const {setFav, fav} = useContext(UserLogin)

    useEffect(() => {
       // Categorías
       getDataFromApi(apiMlCategorias)
                .then(data => data.json())
                .then(data => setCategorias(data.splice(0, 15)))
                .catch(error => console.log(error));
    }, [])
    
    return ( 
        <>
            {location === '/sign-up' ? <HeaderSignUp /> :
                // {carrito.length > 0 ? console.log(carrito) : console.log(typeof carrito)}
                <header id = 'header' className = 'container-2xl'>
                    <div className = 'header__container flex flex-row flex-wrap'>
                        <Logo /> 
                        <Searcher
                            imgLupa = {imgLupa}
                            setItemSearch = {setItemSearch}
                        />
                        <Envios />
                        <NavBar 
                            imgLocation = {imgLocation}
                            imgCarrito = {imgCarrito}
                            fav = {fav}
                            setFav = {setFav}
                            categorias = {categorias}
                        /> 
                    </div> 
                </header>
            }
        </>
     );

}
export default Header;