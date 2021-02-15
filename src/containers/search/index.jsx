/* eslint-disable default-case */
import {useState, useEffect} from 'react'
import {Link, useParams, useLocation} from 'react-router-dom'

import AsideSearch from '../../components/search/asideSearch'
import CardSearch from '../../components/search/cardsSearch'

import getDataFromApi from '../../modules/fetch'

const Search = () => {

    // Consigo los parametros de la busqueda.
    const {searchParam, filter, filter1, filter2, filter3, filter4, filter5 } = useParams();

    // state para la busqueda.
    const [search, setSearch] = useState('');
    const [dataSearch,  setDataSearch] = useState([]);

    // State para los filtros de busqueda.
    const [filters, setFilters] = useState([]);

    useEffect(() => {
        
        if(filter){
            const filtersParams = addFilters();
            getDataFromApi(filtersParams)
                .then(data => data.json())
                .then(data => setSearch(data.results))
            console.log(filtersParams)
        }else{
            const apiMlVisto = `https://api.mercadolibre.com/sites/MLA/search?q=${getSearchParam(searchParam)}`;
            getDataFromApi(apiMlVisto)
                .then(data => data.json())
                .then(data => setSearch(data.results))
                .catch(e => console.log(e));

            getDataFromApi(apiMlVisto)
                .then(data => data.json())
                .then(data => setDataSearch([data]));
        }
    }, [searchParam, filters])

    const getSearchParam = param => (param.includes('-')) ? param.split('-').join('%20') : param;

    const getParam = param => (param.includes('-')) ? param.split('-').join(' ') : param;

    const addFilters = () => {
        let params;
        let apiFilters = `https://api.mercadolibre.com/sites/MLA/search?q=${getSearchParam(searchParam)}`

        filters.forEach( (filterUrl, index) => {
            switch(index){
                case 0:
                    params = `&${filterUrl}=${filter}`
                    break;
                case 1:
                    params = `&${filterUrl}=${filter1}`
                    break;
                case 2:
                    params = `&${filterUrl}=${filter2}`
                    break;
                case 3:
                    params = `&${filterUrl}=${filter3}`
                    break;
                case 4:
                    params = `&${filterUrl}=${filter4}`
                    break;
                case 5:
                    params = `&${filterUrl}=${filter5}`
                    break;
            }
            apiFilters += params
        })
        return apiFilters;
    }
    

    return (
        <>
            <section className = 'section'>
                <div className = 'section__container search'>
                    <aside className = 'search__aside'>
                        <AsideSearch
                            searchParam = {getParam(searchParam)}
                            dataSearch = {dataSearch}
                            setFilters = {setFilters}
                            filters = {filters}
                        />
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
