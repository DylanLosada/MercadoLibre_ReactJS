import {useState} from 'react';
import Usuario from '../cuenta';

const NavBar = ({imgLocation, imgCarrito}) => {

    const [categorias, setCategorias] = useState([]);

    async function api () {
        return await fetch('../../../dbListaCategorias/categorias.txt');
    }

    const responseApi = api();
    responseApi
    .then(data => data)
    .then(data => console.log(data))

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
                    <li>
                        Categorías
                        {/* <nav>
                            <ul>
                                {
                                    categorias.map( categoria => <li><a>{categoria}</a></li>)
                                }
                            </ul>
                        </nav> */}
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
            />
        </div>
     );

}
export default NavBar;