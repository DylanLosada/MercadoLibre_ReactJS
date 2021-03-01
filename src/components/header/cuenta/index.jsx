import {Dropdown, DropdownButton} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import UserAccount from '../userAccount'

const Usuario = ({imgCarrito, carrito, deleteFav, user, sessionOut}) => {
    return ( 
        <nav className = 'header__navBar-usuario'>
            <ul className = 'header__navBar-usuario-ul'>
                <li className = {user.length > 0 && 'header__navBar-usuario-ul-option header__navBar-usuario-ul-option--width dropMenu dropMenu--colorRow relative'}>{user.length > 0 ? <UserAccount user = {user} sessionOut = {sessionOut} /> : <Link className = 'header__navBar-usuario-ul-option header__navBar-usuario-ul-option--width' to = {'/sign-in'}>Creá tu cuenta</Link>}</li>
                {user.length === 0 ? <li><Link 
                        className = 'header__navBar-usuario-ul-option' 
                        to = {'/sign-up'}
                    >Ingresá</Link></li> : null}
                <li><a className = 'header__navBar-usuario-ul-option'>Mis compras</a></li>
                {user.length > 0 ? <li>
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
                </li> : null }
                <Link to = {user.length > 0 ? '/carrito' : '/sign-in'} className = 'header__navBar-usuario-ul-liCarriro'>
                    <img src={imgCarrito} alt="Carrito"/>
                </Link>
            </ul>
        </nav>
     );
}
 
export default Usuario;