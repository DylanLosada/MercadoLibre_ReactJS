import {Button, Form} from 'react-bootstrap'

const FormField = ({button = false, 
                    stylesClickOnInput = false, 
                    stock = false, inputEvent = false, 
                    type = 'number', 
                    name, 
                    signIn = false,
                    ref, 
                    errors}
) => (
        <div 
            onClick={button ? stylesClickOnInput : null} 
            className = 'buttonContainer__ul-cantidad-masCantidad-divContainer relative'
            id = 'inputContainer'
        >
            <div id='inputContainer__barra' className = {`buttonContainer__ul-cantidad-masCantidad-divContainer-barra w-100 ${signIn && 'lineBottomSignIn'}`}></div>
            <Form.Control id = 'liMasUnidadesInput'
                        className = 'buttonContainer__ul-cantidad-masCantidad-input' 
                        name = {name} 
                        type= {type}
                        min = {button ? '7' : null}
                        max = {button ? stock : null}
                        ref = {ref}
                        onChange = {button ? inputEvent : null}
            />
            
            {button ? 
                <Button 
                    id = 'buttonSubmitInputCantidad'
                    className = 'absolute buttonContainer__ul-cantidad-masCantidad-buttonSubmit'
                    onClick = { () => inputEvent}
                >
                    <i class="fas fa-greater-than"></i>
                </Button>    
            : null}
        </div>
)

export default FormField
