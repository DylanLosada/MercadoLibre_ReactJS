import {Link} from 'react-router-dom'

const finishBuyAdress = ({user}) => {
    return (
        <div className = 'finishBuy__adress'>
            <h1 className = 'finishBuy__adress-title'>Opciones de envío a</h1>

            <div className = 'finishBuy__adress-container'>
                <div className = 'finishBuy__adress-container-symbol'>
                    <i class="fas fa-map-marker-alt"></i>
                </div>

                {user[0]?.adress ? 
                    <div className = 'finishBuy__adress-container-adress w-50'>
                        <div>
                            <h4 className = 'font-semibold text-gray-900'>
                                {`${user[0]?.adress.adress} ${user[0]?.adress.altura}`}
                            </h4>
                        </div>
                        <div>
                            <p>{`${user[0]?.adress.postCode} - ${user[0]?.adress?.provincia}, ${user[0]?.adress?.localidad}`}</p>
                        </div>
                    </div>    
                : <div className = 'finishBuy__adress-container-adress w-50'>
                    No se ah proporcionado ninguna dirección aún
                </div>}
                

                <Link to = {'/adress-config'}>Cambiar dirección</Link>
            </div>
        </div>
    )
}

export default finishBuyAdress
