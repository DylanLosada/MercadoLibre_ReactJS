import {BrowserRouter, Switch, Route, Link, useParams, useHistory} from 'react-router-dom'
import {useState, useEffect} from 'react'

import Header from './containers/Header';
import Main from './containers/Main';
import Search from './containers/search';
import SearchCategorie from './containers/searchCategories';
import Producto from './containers/producto';
import Carrito from './components/carrito';
import FinishBuy from './containers/finishBuy';
import SignIn from './containers/signIn'
import SignUp from './containers/signUp'
import FormInfoBuyer from './containers/formInfoBuyer'
import MercadoPago from './containers/mercadoPago'
import './styles/App.scss';

import {GlobalExportContext} from './context/GlobalContext';
import {UserLoginExport} from './context/UserLoginContext'
import UserExporSearchData from './context/UserSearchData'

function App() {

  // State para el cambio de ruta por params
  const [searchUrl, setSearchUrl] = useState('');

  // state para las rutas.
  // const [ location, setLocation] = useState('');

  const {searchParam} = useParams;
  console.log(searchParam)

  useEffect(() => {

  })


  return (
    <>
      <GlobalExportContext>
        <UserLoginExport>
          <UserExporSearchData>
            <BrowserRouter>
                <Header />
                <Switch>

                  <Route exact path = '/'>
                    <Main />
                  </Route>

                  <Route exact path = {`/search/:searchParam/:filter?/:filter1?/:filter2?/:filter3?/:filter4?/:filter5?`}>
                    <Search />
                  </Route>

                  <Route exact path = '/search-categorie/:categorie'>
                    <SearchCategorie />
                  </Route>

                  <Route exact path = {`/producto/:idProducto` }>
                    <Producto />
                  </Route>
                
                  <Route exact path = '/carrito'>
                    <Carrito />
                  </Route>

                  <Route exact path = '/finish-buy'>
                    <FinishBuy />
                  </Route>

                  <Route exact path = '/sign-in'>
                    <SignIn />
                  </Route>

                  <Route exact path = '/sign-up'>
                    <SignUp />
                  </Route>

                  <Route exact path = '/adress-config'>
                    <FormInfoBuyer />
                  </Route>

                  <Route exact path = '/mercado-pago'>
                    <MercadoPago />
                  </Route>

                </Switch>
            </BrowserRouter>
          </UserExporSearchData>
        </UserLoginExport>
      </GlobalExportContext>
    </>
  );
}

export default App;
