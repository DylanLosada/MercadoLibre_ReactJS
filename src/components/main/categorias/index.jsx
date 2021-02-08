// Libreria Swiper para sliders
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

// install Swiper components
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const Categorias = () => {
    return(
        <section className = 'section'>
            <div className = 'section__container'>
                <Swiper>
                    
                </Swiper>
            </div>
        </section>
    )
} 

export default Categorias;