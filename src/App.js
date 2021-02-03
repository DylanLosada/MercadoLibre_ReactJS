import Header from './containers/Header';
import Main from './containers/Main';
import './styles/App.scss';

function App() {
  return (
    <>
      <Header />
      <Main 
        message = 'Voy a ser el Main de la página de Mercado Libre!!!'
      />
    </>
  );
}

export default App;
