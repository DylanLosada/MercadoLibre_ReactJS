import {useState} from 'react';
// import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
// import { Swiper, SwiperSlide } from 'swiper/react';
import { Form } from 'react-bootstrap';
import ItemCounter from './itemCounter';

// // Import Swiper styles
// import './slider/styles.scss';
// import 'swiper/components/navigation/navigation.scss';
// import 'swiper/components/pagination/pagination.scss';
// import 'swiper/components/scrollbar/scrollbar.scss';

// install Swiper components
// SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);


const Main = ({message}) => {

    
    // Uso el state.
    // const [images, setImages] = useState([]);
                                                            // Imágenes Lógica.
    // const apiUrl = 'https://pixabay.com/api/?key=20049617-3489021c09a3938e841590738&q=gamming&image_type=photo&min_width=1900&per_page=3';

    // const apiImgages = async function getImageFromPixabay () {
    //     return await fetch(apiUrl);
    // }

    // const responseApi = apiImgages(apiUrl);

    // responseApi
    //                 .then(data => data.json())
    //                 .then(data => setImages([...data.hits]))
        
    return ( 
    <>
        <h1>{message}</h1>
        <ItemCounter 
            stock = {20}
            initial = {5}
        />
        {/* <Swiper
            id = 'slider'
            tag = 'section'
            spaceBetween={50}
            slidesPerView={3}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
        >
            {
                images.map( rutaImg => 
                      <SwiperSlide>
                          <img src ={rutaImg.userImageURL} alt = 'Imágen Slider'></img>
                      </SwiperSlide>)
            }
            <span slot="container-start">Container Start</span>
            <span slot="wrapper-start">Wrapper Start</span>
            <span slot="wrapper-end">Wrapper End</span>
            <span slot="container-end">Container End</span>
        </Swiper> */}
    </>
 )};

 
export default Main;

    

