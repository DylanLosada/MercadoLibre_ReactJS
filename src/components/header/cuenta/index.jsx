import {Dropdown, DropdownButton} from 'react-bootstrap'

const Usuario = ({imgCarrito, carrito, deleteFav}) => {
    return ( 
        <nav className = 'header__navBar-usuario'>
            <ul className = 'header__navBar-usuario-ul'>
                <li><a className = 'header__navBar-usuario-ul-option' href>Invitado</a></li>
                <li><a className = 'header__navBar-usuario-ul-option'>Mis compras</a></li>
                <li>
                    <DropdownButton className = 'relative btn--modifiqued'  title="Favoritos">
                        <div id="favoritos">
                            <div className = 'favoritos__title'>Favoritos</div>
                            <ul className = 'favoritos__ul'>
                                {carrito.length > 0 ? carrito.map( fav => 
                                    <li
                                        key = {fav.id}
                                    >
                                        <Dropdown.Item 
                                            className = 'favoritos__ul-item relative'
                                            href="#/action-1"
                                        >
                                            <div
                                                className = 'favoritos__delete'
                                                onClick = {() => deleteFav(fav.id)}
                                            >Eliminar</div>
                                            <img 
                                                className = 'favoritos__ul-item-img'
                                                src= {fav.imagen} 
                                                alt="Producto favorito"/
                                            >
                                            <div className = 'favoritos__ul-item-desc'>
                                                <h3 className = 'favoritos__ul-item-desc-title'>{fav.nombre}</h3>
                                                <div className = 'favoritos__ul-item-desc-precio'>$ {fav.precio}</div>
                                            </div>
                                        </Dropdown.Item>
                                    </li>
                                ) : null}
                            </ul>
                            <a className = 'favoritos__verTodo' href="">Ver todos los Favoritos</a>
                        </div>
                        
                    </DropdownButton>
                </li>
                <li className = 'header__navBar-usuario-ul-liCarriro'><img src={imgCarrito} alt="Carrito"/></li>
            </ul>
        </nav>
     );
}
 
export default Usuario;