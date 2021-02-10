import {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'

import CardSearch from '../../components/search/cardsSearch'

import getDataFromApi from '../../modules/fetch'

const Search = () => {

    // Consigo los parametros de la busqueda.
    const {searchParam} = useParams();

    // state para la busqueda.
    const [search, setSearch] = useState('');

    useEffect(() => {
        const apiMlVisto = `https://api.mercadolibre.com/sites/MLA/search?q=${getParam(searchParam)}&limit=10`;
        getDataFromApi(apiMlVisto)
            .then(data => data.json())
            .then(data => setSearch(data.results))

    }, [searchParam])

    const getParam = param => (param.includes('-')) ? param.split('-').join('%20') : param;
    

    return (
        <>
            <section className = 'section'>
                <div className = 'section__container search'>
                    <aside className = 'search__aside'>

                    </aside>
                    <section className = 'search__products'>
                        <CardSearch 
                            search = {search}
                        />
                    </section>
                </div>
            </section>
        </>
    )
}

export default Search
