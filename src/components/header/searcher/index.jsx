import {Link, useHistory} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import {useState} from 'react'

const Searcher = ({imgLupa, setItemSearch}) => {

    const [searcher, setSearcher] = useState('')

    const {handleSubmit} = useForm();

    const history = useHistory()

    const searchFunction = (e) => {
        let get = '';
        let text = e.target.value;

        if(text.includes(' ')){
           get += text.split(' ').join('-');
        }
        else{
            get += text;
        }

        setSearcher(get);
    }

    const handleSubmitSearch = (e) => {
        (searcher.length > 0) && history.push(`/search/${searcher}`);
    }
    
    return (
        <form 
            className = 'header__searcher shadow rounded'
            method = 'GET'
            onSubmit = {handleSubmit(handleSubmitSearch)}
        >
            <input
                type = 'text'
                placeholder = 'Buscar productos, marcas y más...'
                onChange = { (e) => searchFunction(e)}
            ></input>
            <Link to={ (searcher.length > 0) ? `/search/${searcher}` : '/' }>
                <div className = 'header__searcher-lupaButton'>
                    <img src = {imgLupa} alt="Lupa" srcset=""/>
                </div>
            </Link> 
            
        </form>
    )
};

export default Searcher;