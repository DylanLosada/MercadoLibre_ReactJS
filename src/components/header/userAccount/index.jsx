import {Link} from 'react-router-dom'

const UserAccount = ({user, sessionOut}) => {
    return (
            <>
                <p className = 'd-flex align-items-center'>
                    <i class="far fa-user-circle mr-2"></i>
                    {user.map(field => field.name)} 
                </p>
                <nav className = 'navUserHidden'>
                    <ul className = 'navUserHidden__containerLinks'>
                        <li>
                            <Link to = {`/`} className = 'navUserHidden__containerLinks-link'>Mis datos</Link>
                        </li> 
                      
                        <li>
                            <Link 
                                to = {`/`}
                                className = 'navUserHidden__containerLinks-link'
                                onClick = {() => sessionOut()}
                            >Salir</Link>
                        </li>
                    </ul>
                </nav>
            </>
    )
}

export default UserAccount
