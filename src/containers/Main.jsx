// Importo fetch
import getDataFromApi from '../modules/fetch';

// State
import {useState, useEffect} from 'react';

// Libreria Swiper para sliders
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';


// Components
import ItemCounter from './itemCounter';
import Cards from '../components/main/cards';
import MediosPago from '../components/main/mediosPago';

// install Swiper components
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

// const token = 'TEST-8996856766715937-020519-760b56814269813cb5d24795ad20153d-398590246';
const apiIMediosPago = './dbLocal/mediosPago/mediosPago.json';
const apiMlaUrl = 'https://api.mercadolibre.com/sites/MLA/search?q=Sony&limit=25&status=active';
const apiMlVisto = 'https://api.mercadolibre.com/sites/MLA/search?category=MLA1000';
const apiBanner = 'https://api.mercadolibre.com//sites/MLA/search?category=MLA1071';
const apiDb = './dbLocal/banners.json';
// const apiDeals = 'https://api.mercadolibre.com/users/202593498/deals/search'
const apiDeals = 'https://api.mercadolibre.com/sites/MLA/search?q=ofertas'


const Main = ({setCarrito, carrito}) => {

    // Uso el state para generar el banner principal.
    const [banner, setBanner] = useState([]);

    // Uso el state para generar el banner principal.
    const [visto, setVisto] = useState([]);

    // Uso el state.
    const [mediosPago, setMediosPago] = useState([]);

    // Uso el state para generar ofertas.
    const [ofertas, setOfertas] = useState([]);

    // Uso el state para generar ofertas.
    const [intereses, setIntereses] = useState([]);
                                                            // Imágenes Lógica.
    useEffect(() => {
        
        // Medios de pago.
        getDataFromApi (apiIMediosPago)
                        .then(data => data.json())
                        .then(data => setMediosPago(data.results))
                        .catch(error =>console.log(error))

        // Lo visto anteriormente
        getDataFromApi(apiMlVisto)
                        .then(data => data.json())
                        .then(data => setVisto(data.results))
                        .catch(error => console.log(error));

        // Ofertas
        getDataFromApi(apiMlaUrl)
                        .then(data => data.json())
                        .then(data => setOfertas(data.results));
        
        // Intereses
        getDataFromApi(apiBanner)
                        .then(data => data.json())
                        .then(data => setIntereses(data.results));

        // Banners
        getDataFromApi(apiDb)
                        .then(data => data.json())
                        .then(data => setBanner(data.results))
                        .catch(error => console.log(error));

        getDataFromApi(apiDeals)
                        .then(data => data.json())
                        .then(data => console.log(data))
                        .catch(error => console.log(error));

    }, []);

    const cardsCreator = (titulo, verMas) => {
        return({
            title: titulo,
            more: verMas
        })
    }
        
    return ( 
    <>
        <Swiper
            id = 'slider'
            tag = 'section'
            spaceBetween={0}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            // onSwiper={(swiper) => console.log(swiper)}
            // onSlideChange={() => console.log('slide change')}
        >
            { banner.length > 0 ?
                banner.map( (rutaImg) => 
                      <SwiperSlide key = {rutaImg.id}>
                          <img 
                            src = {rutaImg.url} 
                            alt = 'Imágen Slider'
                          ></img>
                      </SwiperSlide>) : null}
        </Swiper>

        <MediosPago 
            mediosPago = {mediosPago}
        />

        {/* <ItemCounter 
            stock = {20}
            initial = {5}
        /> */}

        <Cards 
            productos = {visto}
            title = {cardsCreator('Basado en tu última visita', 'historial').title}
            verMas = {cardsCreator('Basado en tu última visita', 'historial').more}
            setCarrito = {setCarrito}
            carrito = {carrito}
        />

        <Cards 
            productos = {ofertas}
            title = {cardsCreator('Ofertas', 'todas').title}
            verMas = {cardsCreator('Ofertas', 'todas').more}
            priceBefore = {true}
            oferta = {true}
        />

        <Cards 
            productos = {intereses}
            title = {cardsCreator('También puede interesarte', 'historial').title}
            verMas = {cardsCreator('También puede interesarte', 'historial').more}
        />

    </>
 )};

 
export default Main;

    

