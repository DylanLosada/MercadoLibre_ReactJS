import {Spinner} from 'react-bootstrap';
import AsideSearch from '../../components/search/asideSearch'
import CardSearch from '../../components/search/cardsSearch';
import getDataFromApi from '../../modules/fetch';
import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react'

// const probando = (idCategories) => {
//     let arraySubCategories = [];
//     idCategories.forEach(id => {
//         const apiPrueba = `https://api.mercadolibre.com/categories/${id}`;
//             getDataFromApi(apiPrueba)
//             .then(data => data.json())
//             .then(data => arraySubCategories.push(data));
//     })
//     console.log(arraySubCategories)
// }

const SearchCategorie = () => {

    const {categorie} = useParams();
    console.log(categorie)

    const [categoria, setCategoria] = useState([])

    useEffect(() => {
        const apiCategoria = `https:api.mercadolibre.com/sites/MLA/search?category=${categorie}`
        getDataFromApi(apiCategoria)
        .then(data => data.json())
        .then(data => setCategoria(data.results));
        // .then(data => console.log(data));
    }, [categorie])

    return (
        <section className = 'section'>
            <div className = 'section__container search'>
                <aside className = 'search__aside'>
                    <AsideSearch
                        search = {categoria}
                    />
                </aside>
                <section className = 'search__products'>
                    {categoria.length > 0 ? 
                        <CardSearch
                            search = {categoria}
                        />
                    : <Spinner animation="border" variant="primary" />}
                </section>
            </div>
        </section>
    )
}

export default SearchCategorie;
