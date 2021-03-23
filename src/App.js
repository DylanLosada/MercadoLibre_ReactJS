import {BrowserRouter, Switch, Route, Link, useParams, useHistory} from 'react-router-dom'
import {useState, useEffect, Fragment} from 'react'

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
import MisCompras from './containers/misCompras'
import Historial from './containers/historial'
import OficialStore from './containers/oficialStore'
import Footer from './components/footer'
import './styles/App.scss';

import {GlobalExportContext} from './context/GlobalContext';
import {UserLoginExport} from './context/UserLoginContext'
import UserExporSearchData from './context/UserSearchData'
import {MisComprasExportContext} from './context/MisComprasContext'

function App() {

  const [ predicterVisible, setPredicterVisible] = useState(true);

  const {searchParam} = useParams;
  console.log(searchParam)

  return (
    <Fragment>
      <GlobalExportContext>
        <UserLoginExport>
          <UserExporSearchData>
            <MisComprasExportContext>
                <BrowserRouter>
                    <Header 
                      predicterVisible = {predicterVisible}
                      setPredicterVisible = {setPredicterVisible}
                    />
                    <Switch>

                      <Route exact path = '/'>
                        <Main />
                      </Route>

                      <Route exact path = {`/search/:searchParam/:filter?/:filter1?/:filter2?/:filter3?/:filter4?/:filter5?`}>
                        <Search />
                      </Route>

                      {/* <Route exact path = '/search-categorie/:categorie'>
                        <Search />
                      </Route> */}

                      <Route exact path = '/historial'>
                        <Historial />
                      </Route>

                      <Route exact path = '/oficial-store'>
                        <OficialStore />
                      </Route>

                      <Route exact path = {`/producto/:idProducto/:listProducts?` }>
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

                      <Route exact path = '/mis-compras'>
                        <MisCompras />
                      </Route>

                    </Switch>
                    
                    <Footer />
                </BrowserRouter>
            </MisComprasExportContext>
          </UserExporSearchData>
        </UserLoginExport>
      </GlobalExportContext>
    </Fragment>
  );
}

export default App;
