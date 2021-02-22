import Search from '../search';

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

const SearchCategorie = () => (
        <Search 
            categories = {true}
        />
    )


export default SearchCategorie;
