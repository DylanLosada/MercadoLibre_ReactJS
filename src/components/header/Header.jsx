import Logo from './logo';
import NavBar from './navBar';
import Envios from './envios';
import Searcher from './searcher';

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