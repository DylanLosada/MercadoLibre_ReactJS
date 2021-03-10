// Libreria Swiper para sliders
import {useState} from 'react';

import SwiperCore, { Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';

import {Table} from 'react-bootstrap'
import Cards from '../cards'

// install Swiper's Thumbs component
SwiperCore.use([Thumbs]);

const ImageProduct = ({producto, seller, user, handleExistUser, cantidaInput, setCantidadInput, history, handleClickCard}) => {

    console.log(producto)

    // almaceno los thumbs del slider
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    // State para manejar la selección de fotos del producto mediante un hover.
    const [changeImg, setChangeImg] = useState('')

    return (
        <div className = 'producto__info col-xl-8'>
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
                            {producto.pictures.map( (img, index) => 
                                (index <= 7) ? 
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
                                : null
                            )}
                        </Swiper>
                    </div>
                : null}
            </div>

            {seller.results ? 
                <div>
                    <Cards 
                        productos = {seller.results}
                        title = {`Más publicaciones de ${seller.seller.nickname}`}
                        detailProduct = {true}
                        user = {user}
                        history = {history}
                        handleExistUser = {handleExistUser}
                        cantidaInput = {cantidaInput}
                        handleClickCard = {handleClickCard}
                        setCantidadInput = {setCantidadInput}
                        oferta = {true}
                    />
                 </div>
            : null}


            <div className = 'producto__imgsContainer-moreProducts'>
                <h2 className = 'producto__imgsContainer-moreProducts-title'>Características principales</h2>
                <div className = 'producto__imgsContainer-moreProducts-tableContainer'>
                    <Table 
                        striped 
                        bordered 
                        hover 
                        className = 'producto__imgsContainer-moreProducts-tableContainer-table'
                    >
                        <tbody className = 'w-100'>
                            { producto?.attributes && producto?.attributes.map(attr => 
                                <tr className = 'row m-0'>
                                    <th className = 'th col-xl-4'>{attr.name}</th>
                                    <td className = 'td col-xl-8'>{attr.value_name}</td>
                                </tr>
                            )}
                            
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default ImageProduct;
