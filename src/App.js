import {useState} from 'react'

import Header from './containers/Header';
import Main from './containers/Main';
import './styles/App.scss';

function App() {

  // state para el carriro.
  const [carrito, setCarrito] = useState([])

  return (
    <>
    {/* {carrito.length > 0 ? console.log(carrito) : null} */}
      <Header 
        setCarrito = {setCarrito}
        carrito = {carrito}
      />
      <Main 
        setCarrito = {setCarrito}
        carrito = {carrito}
      />
    </>
  );
}

export default App;
