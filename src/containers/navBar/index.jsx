import getDataFromApi from '../../modules/fetch'
import {useState, useEffect} from 'react';
import {Dropdown, DropdownButton} from 'react-bootstrap'
import Usuario from '../../components/header/cuenta';

const NavBar = ({imgLocation, imgCarrito, carrito, setCarrito, categorias}) => {

    const deleteFav = (id) => {
        let newCarrito = carrito.filter( producto => producto.id !== id)
        setCarrito(newCarrito);
    }

    const subConsulta = (consultas) => {
        let array = []
        consultas.forEach( consulta => {

            const apiSubCategoria = `https://api.mercadolibre.com/categories/${consulta.id}`
            getDataFromApi(apiSubCategoria)
                    .then(data => data.json())
                    .then(data => array.push(data.children_categories))
                    .catch(error => console.log(error));
        })

        console.log(array)
        return array;
    }

    const [subCategoria, setSubCategoria] = useState([])

    useEffect(() => { 
        setSubCategoria(subConsulta(categorias))
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
                    <li>
                        <DropdownButton className = ''  title="Categorías">
                            <div id="categorias">
                                <ul className = ''>
                                    {categorias.length > 0 ? categorias.map( categoria => 
                                        <li
                                            key = {categoria.id}
                                        >
                                            <Dropdown.Item 
                                                className = ''
                                                href="#/action-1"
                                            >
                                                {categoria.name}
                                                
                                                    <DropdownButton>
                                                        {subCategoria.map( child => 
                                                                <Dropdown.Item>
                                                                    {child.map( name => console.log(name.name))}
                                                                </Dropdown.Item>    
                                                            )}
                                                    </DropdownButton>
                                                
                                            </Dropdown.Item>
                                        </li>) :null }
                                </ul>
                            </div>
                        </DropdownButton>
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
                carrito = {carrito}
                deleteFav = {deleteFav}
            />
        </div>
     );

}
export default NavBar;