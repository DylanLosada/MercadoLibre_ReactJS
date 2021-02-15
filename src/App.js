import {BrowserRouter, Switch, Route, Link, useParams, useLocation} from 'react-router-dom'
import {useState, useEffect} from 'react'

import Header from './containers/Header';
import Main from './containers/Main';
import Search from './containers/search';
import SearchCategorie from './containers/searchCategories';
import Producto from './containers/producto';
import './styles/App.scss';

function App() {

  // state para el carriro.
  const [carrito, setCarrito] = useState([])

  // State para el cambio de ruta por params
  const [searchUrl, setSearchUrl] = useState('');

  // state para las rutas.
  // const [ location, setLocation] = useState('');

  const {searchParam} = useParams;
  console.log(searchParam)

  // Obtengo la ruta actual.
  
  // console.log(useLocation().pathname)

  // useEffect( () => {
  //   setLocation(useLocation())
  // }, [searchParam] )

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

          <Route exact path = {`/search/:searchParam/:filter?/:filter1?/:filter2?/:filter3?/:filter4?/:filter5?`}>
            <Search />
          </Route>

          <Route exact path = '/search-categorie/:categorie'>
            <SearchCategorie />
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
