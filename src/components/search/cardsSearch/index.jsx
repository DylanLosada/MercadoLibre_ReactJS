import {Card, Button, Badge} from 'react-bootstrap';
import { Link, NavLink, useLocation } from 'react-router-dom';

const CardSearch = ({search, oferta = false, setPaginationItems}) => {

    const location = useLocation().pathname

    return(
        <>
        {search.length > 0 ? search.map( item => 
            <Card
                key = {item.id}
                id = {item.id}
                className = 'cardSearch'
            >
                <div className= 'cardSearch__cards'>
                    {/* <Button 
                        className = 'sliderOfertas__cards-like'
                    >
                        <svg class="sliderOfertas__slider-cards-like-heart" viewBox="0 0 36 32">
                            <path d="M30.4 16q1.5-1.3 2-2.6t.6-3q0-1.4-.7-3T30.6 5q-1.4-1.2-2.4-1.6T25.8 3q-1.5 0-3 .6t-2.6 2l-2 2-2.3-2q-1.8-1.4-3-2T10.2 3t-2.6.4T5.3 5q-1 .7-1.6 2.4t-.7 3q0 1.4.6 3T5.4 16L18 28l12.4-12zM0 10.5q0-1.7.8-4t2.6-3.8Q5 1.2 6.7.7t3.6-.7q2 0 3.8.8t4 2.7q2-2 4-2.7t4-.8 3.4.6 3.3 2Q34.3 4 35 6.3t1 4-.6 4-3 4L18 32 3.4 18.2Q1 16 .4 13.7T0 10.4z"></path>
                        </svg>
                    </Button>

                    <Button className = 'sliderOfertas__slider-cards-like sliderOfertas__slider-cards-like--liked'>
                        <svg class="sliderOfertas__slider-cards-like-heart" viewBox="0 0 36 32">
                            <path d="M0 10.4q0-1.7.8-4t2.6-3.8Q5 1.2 6.7.6t3.6-.6q2 0 3.8.8t4 2.7q2-2 4-2.7t4-.8 3.4.6 3.3 2Q34.3 4 35 6.3t1 4-.6 4-3 4L18 32 3.4 18.2Q1.8 16.7 1 14.7t-1-4.3z"></path>
                        </svg>
                    </Button> */}

                    <Link to = {`/producto/${item.id}`}
                        // on
                        className = 'cardSearch__cards-containerImg'
                    >
                        <Card.Img
                            className = 'cardSearch__cards-containerImg-img img-fluid' 
                            variant="top" 
                            src= {item.thumbnail} 
                        />
                    </Link>
                    <Card.Body 
                        className = 'cardSearch__cards-body'
                    >
                        <NavLink to = {`/producto/${item.id}`} className = 'cardSearch__cards-body-name'>{item.title}</NavLink>
                        {(item.original_price) ? <Card.Subtitle className = 'cardSearch__cards-body-priceBefore'>$ { item.original_price } </Card.Subtitle> : null}
                        <Card.Text className = 'cardSearch__cards-body-price'>
                            <span>$</span>
                            <span>{(item.price).toFixed(0)}</span>
                            { item.original_price ? <span className = 'cardSearch__cards-body-price-off'>{ (100 - (item.price / item.original_price)* 100).toFixed(0) }% OFF</span> : null}
                        </Card.Text>
                        
                        {/* { item.installments ? item.installments.quantity <= 9 && item.installments.rate === 0 ? <div> <p className = 'cardSearch__cards-body-info-shippingFree'>Hasta {item.installments.quantity} cuotas sin interés</p> </div> : null  : null} */}
                        
                        <div className = 'cardSearch__cards-body-info'>
                            <Card.Subtitle className = 'cardSearch__cards-body-info-state'>{ item.condition }</Card.Subtitle>
                            {(item.shipping.logistic_type === 'fulfillment') ? <Badge className = 'cardSearch__cards-body-info-shippingFull'>Llega gratis mañana</Badge> : null}
                            {(item.shipping.free_shipping === false && !item.shipping.logistic_type === 'fulfillment') ? <p className = 'cardSearch__cards-body-info-shippingFree'>Envío gratis</p> : null}
                        </div>
                    </Card.Body>
                </div>
            </Card>    
        ) : null}
            
        </>
    )
}

export default CardSearch;
