import {useState} from 'react';
import {Modal} from 'react-bootstrap';

const ModalMediosPago = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <h3 className = 'titleModlaMediosPago' onClick={handleShow}>ver medios de pago</h3>
            <Modal 
                show={show} 
                onHide={handleClose}
                size="lg"
                className = 'modalMediosPago'
            >
                <Modal.Header className = 'modalMediosPago__header' closeButton>
                    <Modal.Title className = 'modalMediosPago__header-title' id="contained-modal-title-vcenter">Medios de pago</Modal.Title>
                </Modal.Header>
                <iframe 
                    title = 'modalMediosPago'
                    src = 'https://articulo.mercadolibre.com.ar/noindex/services/MLA855510588/payments?controlled=true'
                ></iframe>
            </Modal> 
        </>
    )
}

export default ModalMediosPago
