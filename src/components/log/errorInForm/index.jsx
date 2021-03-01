import {Form} from 'react-bootstrap'

const ErrorInForm = ({error_1, msg_1, error_2 = null, msg_2 = null}) => {
    return (
        <Form.Row className = 'errorCreate'>
            <span className = 'errorCreate__errorMsg'>{`No se ah podido generar el usuario debido a: ${error_1 ? msg_1 : ''} ${error_2 ? msg_2 : '' }`}</span>
        </Form.Row>
    )
}

export default ErrorInForm
