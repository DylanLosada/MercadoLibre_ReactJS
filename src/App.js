import {BrowserRouter, Switch, Route, Link, useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'

import Header from './containers/Header';
import Main from './containers/Main';
import Search from './containers/search';
import Producto from './containers/producto';
import './styles/App.scss';

function App() {

  // state para el carriro.
  const [carrito, setCarrito] = useState([])

  // state para la busqueda.
  // const [ itemSearch, setItemSearch] = useState([])

  const {searchParam} = useParams;
  console.log(searchParam)

  return (
    <>
    <BrowserRouter>
        <Header 
          setCarrito = {setCarrito}
          carrito = {carrito}
          // setItemSearch = {setItemSearch}
        />
        <Switch>

          <Route exact path = '/'>
            <Main 
              setCarrito = {setCarrito}
              carrito = {carrito}
            />
          </Route>

          <Route exact path = '/search/:searchParam'>
            <Search />
          </Route>

          <Route exact path = '/producto/:idProducto'>
            <Producto />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
