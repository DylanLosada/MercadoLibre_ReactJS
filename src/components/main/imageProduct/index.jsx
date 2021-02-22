// Libreria Swiper para sliders
import {useState} from 'react';

import SwiperCore, { Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';

// install Swiper's Thumbs component
SwiperCore.use([Thumbs]);

const ImageProduct = ({producto}) => {

    // console.log(producto.pictures)

    // almaceno los thumbs del slider
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    // State para manejar la selección de fotos del producto mediante un hover.
    const [changeImg, setChangeImg] = useState('')

    return (
        <div className = 'producto__info col-xl-8 pr-0'>
            <div className = 'producto__info-container'>
                
                {producto.pictures ?
                    <div className = 'producto__info-container-imgs'>
                        <Swiper
                            id = 'main'
                            className = 'mainSlider'
                            thumbs={{ swiper: thumbsSwiper }}
                            spaceBetween = {0}
                            slidesPerView = {1}
                        >
                            <SwiperSlide className = 'mainSlider__slide' zoom>
                                <img
                                    className = 'mainSlider__slide-img img-fluid' 
                                    src = {changeImg ? changeImg : producto.pictures[0].url} 
                                    alt = 'Imágen Slider'
                                ></img>
                            </SwiperSlide>
                        </Swiper>

                        <Swiper
                            id = 'thumbs'
                            className = 'thumbsSlider'
                            wrapperTag = 'ul'
                            onSwiper={setThumbsSwiper}
                            spaceBetween = {5}
                            slidesPerView = {producto.pictures.length}
                            watchSlidesVisibility
                            watchSlidesProgress
                        >
                            {producto.pictures.map( img => 
                                <SwiperSlide 
                                    key = {`thumb-${img.id}`}
                                    className = 'thumbsSlider__container-slide w-auto' 
                                    tag = 'li' 
                                    style = {{listStyle: 'none'}}
                                >
                                    <img
                                        className = 'thumbsSlider__container-slide-img' 
                                        src = {img.url} 
                                        alt = 'Imágen Slider'
                                        onMouseEnter = {() => setChangeImg(img.url)}
                                    ></img>
                                </SwiperSlide>
                            )}
                        </Swiper>
                    </div>
                : null}
            </div>

            <div className = 'producto__imgsContainer-moreProducts'></div>
        </div>
    )
}

export default ImageProduct;
