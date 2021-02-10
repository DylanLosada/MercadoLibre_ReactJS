// Libreria Swiper para sliders
import {useState} from 'react';

import SwiperCore, { Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

// install Swiper's Thumbs component
Swiper.use([Thumbs]);

const ImageProduct = ({producto}) => {

    console.log(producto)

    // almaceno los thums del slider
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <div className = 'producto__info'>
            <div className = 'producto__info-container'>
                <div className = 'producto__info-container-imgs'>

                    <Swiper
                        thumbs={{ swiper: thumbsSwiper }}
                        slidesPerColumn = {6}
                        slidesPerView = {3}
                    >
                        <SwiperSlide>
                            <img 
                                src = {producto.thumbnail} 
                                alt = 'Imágen Slider'
                            ></img>
                        </SwiperSlide>
                    </Swiper>

                    <Swiper
                        onSwiper={setThumbsSwiper}
                        watchSlidesVisibility
                        watchSlidesProgress
                    >
                        <SwiperSlide>
                            <img 
                                src = {producto.thumbnail} 
                                alt = 'Imágen Slider'
                            ></img>
                        </SwiperSlide>

                        <SwiperSlide>
                            <img 
                                src = {producto.thumbnail} 
                                alt = 'Imágen Slider'
                            ></img>
                        </SwiperSlide>

                        <SwiperSlide>
                            <img 
                                src = {producto.thumbnail} 
                                alt = 'Imágen Slider'
                            ></img>
                        </SwiperSlide>
                        
                    </Swiper>

                    {/* <div className = 'producto__info-imgsContainer'>
                        <div className = 'producto__info-imgsContainer'></div>
                        <div className = 'producto__info-imgsContainer'>
                            <span className = 'producto__info-imgsContainer'>
                                <label htmlFor=""></label>
                                <figure>
                                    <img src={producto.thumbnail} alt=""/>
                                </figure>
                            </span>
                            <span className = 'producto__info-imgsContainer'>
                                <label htmlFor=""></label>
                                <figure>
                                    <img src= {producto.pictures[0].url} alt=""/>
                                </figure>
                            </span>
                            <span className = 'producto__info-imgsContainer'>
                                <label htmlFor=""></label>
                                <figure>
                                    <img src="" alt=""/>
                                </figure>
                            </span>
                        </div>
                    </div> */}
                </div>
            </div>

            <div className = 'producto__imgsContainer-moreProducts'></div>
        </div>
    )
}

export default ImageProduct;
