import {Link, useHistory} from 'react-router-dom'
import {useState} from 'react'

const Searcher = ({imgLupa, setItemSearch}) => {

    const [searcher, setSearcher] = useState('')

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
        e.preventDefault()
        history.push((searcher.length > 0) ? `/search/${searcher}` : '/')
    }
    
    return (
        <form 
            className = 'header__searcher shadow rounded'
            method = 'GET'
            onSubmit = {handleSubmitSearch}
            // action = { (searcher.length > 0) ? `/search/${searcher}` : '/' }
        >
            <input
                type = 'text'
                placeholder = 'Buscar productos, marcas y más...'
                onChange = { (e) => searchFunction(e)}
            ></input>
            <Link to={ (searcher.length > 0) ? `/search/${searcher}` : '/' }
                    type = 'submit'
                    // onClick = {() => console.log(searcher)}
            >
                <div className = 'header__searcher-lupaButton'>
                    <img src = {imgLupa} alt="Lupa" srcset=""/>
                </div>
            </Link> 
            
        </form>
    )
};

export default Searcher;