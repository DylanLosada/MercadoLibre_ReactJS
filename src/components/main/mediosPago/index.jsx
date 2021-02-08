import {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';

const MediosPago = ({mediosPago}) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (e) => {
        e.preventDefault();
        setShow(true)
    };

    return (
        <section className = 'section  mediosPago'>
            <div className = 'section__container section__container--mediosPago'>
                {mediosPago.length > 0 ? mediosPago.map( (medio, index) => 
                    <div 
                        key = {medio.id}
                        className = 'mediosPago__credito'
                        onClick={handleShow}
                    >
                        {(index === mediosPago.length - 1 ) ? <div className = 'borderPagos'></div> : null}
                        <div className = 'mediosPago__credito-imgContainer'>
                            <img className = 'mediosPago__credito-imgContainer-img' src={medio.url} alt="medio de pago"/>
                        </div>

                        <div className = 'mediosPago__credito-desc'>
                            <h3 className = 'mediosPago__credito-desc-title'>{medio.mensaje}</h3>
                            <div 
                                className = 'mediosPago__credito-desc-modal' 
                                href=""
                            >{medio.mas}</div>
                        </div>
                    </div>) : null}
                


                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </section>
    )
}

export default MediosPago;
