/* eslint-disable no-duplicate-case */
/* eslint-disable default-case */
import SummaryBuy from './summaryBuy'
import BuyButton from './buyButton'
import ContainerPackageProduct from './containerPackageProduct'
import ShippingAdress from './shippingAdress'

import {useContext, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom'
import { GlobalContext } from '../../context/GlobalContext';
import plusCarritoPrices from '../../modules/plusCarritoPrices'
import getDateShipping from '../../modules/getDateShipping'

const FinishBuy = () => {

    const {carrito} = useContext(GlobalContext)

    const [finishBuy, setFinishBuy] = useState([])
    const [totalPrice, setTotalPrice] = useState([])

    const history = useHistory()
    console.log(totalPrice)

    useEffect(() => {
        carrito.length > 0 ? setFinishBuy([...carrito]) : history.push('/');
        setTotalPrice(plusCarritoPrices(carrito));
    }, [carrito])


    return (
        <section className = 'section'>
            <div className ='section__container finishBuy'>
                <div className = 'col-xl-8 mt-5 pr-5'>
                    <ShippingAdress />

                    {finishBuy.length > 0  ? finishBuy.map( (product, index) => 
                        <ContainerPackageProduct 
                            product = {product}
                            getDateShipping = {getDateShipping}
                            index = {index + 1}
                        />    
                    ) : null}

                    <BuyButton 
                        shipping
                    />
                </div>
                
                <SummaryBuy 
                    finishBuy = {finishBuy}
                    totalPrice = {totalPrice}
                />
            </div>
        </section>
    )
}

export default FinishBuy
