import Header from './components/header/Header';
import Main from './components/main/Main';
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
