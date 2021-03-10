const SellerReputation = ({seller}) => {
    console.log(seller.seller)
    return (
        <>
            {seller?.seller ? 
                <div className='sellerReputation'>
                    <h4 className = 'sellerReputation__title'>Informacón de la tienda</h4>

                    {seller.seller?.eshop ? 
                        <div className='sellerReputation__logoContainer'>
                             <img 
                                className='sellerReputation__logoContainer-logo' 
                                src= {seller.seller.eshop.eshop_logo_url} 
                                alt="Logo vendedor"
                            />
                            <p className='sellerReputation__logoContainer-name'>{seller.seller.nickname}</p>
                        </div>

                    : null}
                    
                    <div className = 'sellerReputation__mercadoLider'>
                        <figure className="sellerReputation__mercadoLider-goal">
                            <svg className="sellerReputation__mercadoLider-goal-img" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill-opacity=".8" fill-rule="nonzero" d="M15.998 1.92l.848.849-4.093 4.093a5.8 5.8 0 1 1-5.507 0L3.15 2.77 4 1.92l4 4 1.15-1.148L7.144 2.77l.849-.849 2.003 2.004 2.004-2.004.849.849-3.43 3.428a5.869 5.869 0 0 1 2.122.178l4.456-4.455zM10 7.368a4.6 4.6 0 1 0 0 9.199 4.6 4.6 0 0 0 0-9.199z"></path>
                            </svg>
                        </figure>
                        <h5 className = 'sellerReputation__mercadoLider-title'>
                            {`MercadoLíder ${seller.seller.seller_reputation.power_seller_status}`}
                            {seller.seller.seller_reputation.power_seller_status === 'platinum'&& <span>¡Es uno de los mejores del sitio!</span>}
                        </h5>
                    </div>

                    <div className = 'sellerReputation__colorContainer'>
                        <div className = 'sellerReputation__colorContainer-color sellerReputation__colorContainer-color--red'></div>
                        <div className = 'sellerReputation__colorContainer-color sellerReputation__colorContainer-color--orange'></div>
                        <div className = 'sellerReputation__colorContainer-color sellerReputation__colorContainer-color--yellow'></div>
                        <div className = 'sellerReputation__colorContainer-color sellerReputation__colorContainer-color--green'></div>
                        <div className = 'sellerReputation__colorContainer-color sellerReputation__colorContainer-color--darkGreen colorActive'></div>
                    </div>

                    <div className = 'sellerReputation__soldQuantityContainer'>
                       
                        <p className = 'sellerReputation__soldQuantityContainer-soldQuantity'>
                            {seller.seller.seller_reputation.metrics.sales.completed}
                            <span>Ventas en los útimos 60 días</span>
                        </p>
                    
                    </div>
                </div>
            : null}
        </>
    )
}

export default SellerReputation
