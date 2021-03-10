// Importo fetch
import getDataFromApi from '../modules/fetch';

// State
import React, {useState, useEffect, useContext} from 'react';
import {useHistory} from 'react-router-dom'
// Libreria Swiper para sliders
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';


// Components
import ItemCounter from './itemCounter';
import Cards from '../components/main/cards';
import MediosPago from '../components/main/mediosPago';
import { UserSearchData } from '../context/UserSearchData';
import { UserLogin } from '../context/UserLoginContext';
import { GlobalContext } from '../context/GlobalContext';

// install Swiper components
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

// const token = 'TEST-8996856766715937-020519-760b56814269813cb5d24795ad20153d-398590246';
const apiIMediosPago = './dbLocal/mediosPago/mediosPago.json';
const apiMlaUrl = 'https://api.mercadolibre.com/sites/MLA/search?q=Sony&limit=25&status=active';
const apiBanner = 'https://api.mercadolibre.com/sites/MLA/search?category=MLA1071';
const apiDb = './dbLocal/banners.json';
const apiDiscount= 'https://api.mercadolibre.com/sites/MLA/search?q=ofertas&discount=5-100'
const apiDeals = 'https://api.mercadolibre.com/sites/MLA/search?q=ofertas'


const Main = () => {

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

    const history = useHistory()

    const {lastSaw} = useContext(UserSearchData)
    const {fav, setFav, handleExistUserFav, user} = useContext(UserLogin)
    const {handleClickCard} = useContext(GlobalContext)

                                                            // Imágenes Lógica.
    useEffect(() => {
        
            // Medios de pago.
            getDataFromApi (apiIMediosPago)
                .then(data => data.json())
                .then(data => setMediosPago(data.results))
                .catch(error =>console.log(error))

            // Ofertas
            getDataFromApi(apiDiscount)
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

            // getDataFromApi(apiDiscount)
            //                 .then(data => data.json())
            //                 .then(data => console.log(data))
            //                 .catch(error => console.log(error));

            if(lastSaw){
                localStorage.setItem('lastSaw', JSON.stringify(lastSaw))
                const apiVisto = `https://api.mercadolibre.com/sites/MLA/search?category=${lastSaw.filters[0].values[0].id}`;
                getDataFromApi(apiVisto)
                    .then(data => data.json())
                    .then(data => setVisto(data.results.reverse()))
                    .catch(error => console.log(error));
            }
        
            return () => {
                window.removeEventListener('click', handleClickCard)
            }

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

        <Cards 
            productos = {ofertas}
            user = {user}
            title = {cardsCreator('Ofertas', 'todas').title}
            verMas = {cardsCreator('Ofertas', 'todas').more}
            priceBefore = {true}
            handleClickCard = {handleClickCard}
            history = {history}
            handleExistUserFav = {handleExistUserFav}
        />

        <Cards 
            productos = {intereses}
            user = {user}
            title = {cardsCreator('También puede interesarte', 'historial').title}
            verMas = {cardsCreator('También puede interesarte', 'historial').more}
            handleExistUserFav = {handleExistUserFav}
        />

        <Cards 
            productos = {lastSaw? visto : 'No has visto nada aún'}
            user = {user}
            title = {cardsCreator('Basado en tu última visita', 'historial').title}
            verMas = {cardsCreator('Basado en tu última visita', 'historial').more}
            handleExistUserFav = {handleExistUserFav}
        />

    </>
 )};

 
export default React.memo(Main);

    

