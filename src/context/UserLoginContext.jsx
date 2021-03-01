import { Children } from 'react';
import {createCondex, createContext, useState, useEffect} from 'react'
import {getFireStore} from '../utilitis/fireBase'

export const UserLogin = createContext();

export const UserLoginExport = ({children}) => {

    const [user, setUser] = useState([])
    // const [createdUser, setCreatedUser] = useState(false)
    const [spinnerLoader, setSpinnerLoader] = useState(false)
    const [ fileId, setFileId ] = useState(true)
    const [errorMail, setErrorMail] = useState(false)
    const [errorDni, setErrorDni] = useState(false)

    const craeteNewUser = (newUser) =>{
        const db = getFireStore()

        const users = db.collection('usuarios')

        users.add(newUser)
            .then(({id}) => {
                setSpinnerLoader(true)
                !id && setFileId(false)
                setUser([{id: newUser.dni , name:  newUser.name , surname:  newUser.surname}])
                localStorage.setItem('user', JSON.stringify(user))
            })
            .catch(e => console.log(e))
            .finally(() => setTimeout(() => setSpinnerLoader(false), 300))
    }

    const sessionOut = () => {
        localStorage.removeItem('user');
        setUser([]);
    }

    useEffect(() => {
        localStorage.getItem('user') && setUser(JSON.parse(localStorage.getItem('user')))
    }, [])

    return( 
        <UserLogin.Provider value = {{user, setUser, craeteNewUser, spinnerLoader, fileId, setFileId, errorMail, setErrorMail, errorDni, setErrorDni,
                                    sessionOut, setSpinnerLoader}}>
            {children}
        </UserLogin.Provider>
     )
}