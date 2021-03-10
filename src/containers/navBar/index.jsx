import getDataFromApi from '../../modules/fetch'
import { useEffect, useContext} from 'react';
import {Link, useHistory} from 'react-router-dom'
import Usuario from '../../components/header/cuenta';
import { UserLogin } from '../../context/UserLoginContext';
import { conecctionDb } from '../../utilitis/fireBase';

const apiCategorias = 'https://api.mercadolibre.com/sites/MLA/categories'

const NavBar = ({imgLocation, imgCarrito, fav, setFav, categorias}) => {

    const {user, sessionOut, updateFavUser, deleteFavUser, addCarritoFavUser} = useContext(UserLogin)
    const history = useHistory()

    useEffect(() => { 
        getDataFromApi(apiCategorias)
            .then(data => data.json())
            .then(data => console.log(data.splice(0, 15)))
    }, [])


    return ( 
        <div className = 'header__navBar flex-1 flex-grow'>

            <a className='header__navBar-capitalLink' href="https://www.mercadolibre.com.ar/navigation/addresses-hub?go=https%3A%2F%2Flistado.mercadolibre.com.ar%2Fyerba-canarias_Deal_verano-liquidacion-cuidado-moda" data-modal-action="true" tabIndex="6">
                <img src={imgLocation} alt="Envias a Capital" srcset=""/>
                <div>
                    <p className="header__navBar-capitalLink-send">Enviar a</p>
                    <p className="header__navBar-capitalLink-capital"> Capital Federal</p>
                </div>
            </a>

            <nav className = 'header__navBar-nav'>
                <ul className = 'header__navBar-nav-ul'>
                    <li className = 'header__navBar-nav-ul-list'>
                            Categorías
                            {categorias.length > 0 ?  
                                <nav id="categorias" className = 'header__navBar-nav-ul-list-categories'>
                                    <ul className = 'header__navBar-nav-ul-list-categories-list'>
                                     {categorias.map( categoria =>
                                        <li
                                            key = {categoria.id}
                                        >
                                            <Link to = {`/search-categorie/${categoria.id}`} className = 'header__navBar-nav-ul-list-categories-list-categorie'>{categoria.name}</Link>
                                        </li>)}
                                    </ul>
                                </nav>
                            : null }
                    </li>
                    <li><a>Ofertas</a></li>
                    <li><a>Historial</a></li>
                    <li><a>Supermercado</a></li>
                    <li><a>Tiendas Oficiales</a></li>
                    <li><a>Vender</a></li>
                    <li><a>Ayuda</a></li>
                </ul>
            </nav>

            <Usuario 
                imgCarrito = {imgCarrito}
                fav = {fav}
                updateFavUser = {updateFavUser}
                user = {user}
                sessionOut = {sessionOut}
                deleteFavUser = {deleteFavUser}
                addCarritoFavUser = {addCarritoFavUser}
                history = {history}
            />
        </div>
     );

}
export default NavBar;