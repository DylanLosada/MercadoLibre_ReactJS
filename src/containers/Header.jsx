import Logo from '../components/header/logo';
import NavBar from '../components/header/navBar';
import Envios from '../components/header/envios';
import Searcher from '../components/header/searcher';

const imgLocation = './assets/iconos/ubicacion.svg';
const imgLupa = './assets/iconos/lupa.svg';
const imgCarrito = './assets/iconos/carrito.svg';

const Header = () => {

    return ( 
        <header id = 'header' className = 'container-2xl'>
            <div className = 'header__container flex flex-row flex-wrap'>
                <Logo /> 
                <Searcher
                    imgLupa = {imgLupa}
                />
                <Envios />
                <NavBar 
                    imgLocation = {imgLocation}
                    imgCarrito = {imgCarrito}
                />
            </div> 
        </header>
     );

}
export default Header;