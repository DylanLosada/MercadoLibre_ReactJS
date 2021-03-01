import {Card} from 'react-bootstrap'

const PackageProduct = ({product, getDateShipping, index}) => {
    console.log(product)
    return (
        <div className = 'w-100 mb-4'>
            <div className = 'finishBuy__package'>
                <h3 className = 'finishBuy__package-name'>Paquete {index}</h3>
            </div>

            <Card className = 'finishBuy__cardShipping'>
                <Card.Header className = 'finishBuy__cardShipping-header'>
                    <h2 className = 'finishBuy__cardShipping-header-title'>{product.free_shipping  ? <span>{getDateShipping()} <span>Gratis</span></span> : null}</h2>
                </Card.Header>
                <Card.Body className = 'finishBuy__cardShipping-body'>
                    <div className = 'finishBuy__cardShipping-body-imgContainer'>
                        <img className = 'finishBuy__cardShipping-body-imgContainer-img img-fluid'  src={product.img} alt="Producto"/>
                    </div>
                    <div className = 'finishBuy__cardShipping-body-infoContaier'>
                        <h4 className = 'finishBuy__cardShipping-body-infoContaier-name'>{product.name}</h4>
                        <p className = 'finishBuy__cardShipping-body-infoContaier-quantity finishBuy__cardShipping-body-infoContaier-quantity--marginBottom'>
                            Cantidad: {product.quantity}
                        </p>
                        <p className = 'finishBuy__cardShipping-body-infoContaier-price'>$ {product.price}</p>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}

export default PackageProduct
