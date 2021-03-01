

const SummaryBuy = ({finishBuy, totalPrice}) => {
    return (
        <aside className = 'finishBuy__summaryBuy  p-0'>
            <div className = 'finishBuy__summaryBuy-container'>
                <div className = 'finishBuy__summaryBuy-container-titleContainer'>
                    <h3 className = 'finishBuy__summaryBuy-container-titleContainer-title'>Resumen de compra</h3>
                </div>

                <div className = 'finishBuy__summaryBuy-container-info'>
                    <div className = 'finishBuy__summaryBuy-container-info-wrap'>
                        <p className = 'finishBuy__summaryBuy-container-info-wrap-product'> 
                            <span>Productos ( {finishBuy.length} ) </span>
                            <span className = 'fontSizePrices'>$ {totalPrice}</span> 
                        </p>
                        <p className = 'finishBuy__summaryBuy-container-info-wrap-shipping'> 
                            <span>Envío</span>
                            <span className = 'fontSizePrices'>$ 427</span> 
                        </p>
                    </div>
                </div>

                <div className = 'finishBuy__summaryBuy-container-total'>
                    Total
                    <p className = 'finishBuy__summaryBuy-container-total-totalPrice'>
                        <span className = 'fontSizePrices'>$ {totalPrice + 427}</span>
                    </p>
                </div>
            </div>
        </aside>
    )
}

export default SummaryBuy;
