const Usuario = ({imgCarrito}) => {
    return ( 
        <nav className = 'header__navBar-usuario'>
            <ul className = 'header__navBar-usuario-ul'>
                <li><a href>Creá tu cuenta</a></li>
                <li><a>Ingresá</a></li>
                <li><a>Mis compras</a></li>
                <li className = 'header__navBar-usuario-ul-liCarriro'><img src={imgCarrito} alt="Carrito"/></li>
            </ul>
        </nav>
     );
}
 
export default Usuario;