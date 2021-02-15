import {Fragment, useEffect, useState} from 'react'
import {Link, useLocation} from 'react-router-dom'

const AsideSearch = ({searchParam, dataSearch, setFilters, filters}) => {

    const pathProduct = dataSearch => dataSearch[0]?.filters.filter(categoria => categoria.id === 'category');

    const createFilterItem = (dataSearch, busqueda) => {
        // const objAvailableFilters = dataSearch[0].available_filters;
        // const arrayFilters = [];
        const arrayValues = [];

        // const filter = objAvailableFilters.find(filter => filter.id === busqueda)
            
        dataSearch[0].results.map( filterAttribute => 
            // console.log(filter)
            filterAttribute.attributes.forEach( attribute => { 
                if(attribute.id === busqueda && !arrayValues.find( name => name[1] === attribute.value_name ) && attribute.value_id) {
                    arrayValues.push([attribute.value_id , attribute.value_name])  
                }
            })
        );
        // console.log(arrayFilters)
        return arrayValues.sort();
    }

    const createFilterInfoSeller = (dataSearch) => {
        const arrayValues = [];
        dataSearch[0].results.forEach( filter => {
            if(!arrayValues.find(ciudad => ciudad[0] === filter.seller.id ) && !arrayValues.find(ciudad => ciudad[1] === filter.seller.name )){
                arrayValues.push([filter.seller.id , filter.seller_address.city.name])
            }
        })
        return arrayValues;
    }

    const createFilterBestSeller = (dataSearch) => {
        let i = 0;
        dataSearch[0].results.forEach( filter => {
            try{
                if (filter.seller.seller_reputation.power_seller_status === 'platinum') {
                    i++
                }
            }catch{
                return;
            } 
        })
        return i;
    }

    const createFilterOficialSeller = (dataSearch) => {
        const arrayOficialStoreName = [];
        dataSearch[0].results.forEach( filter => {
            try{
                if (filter.official_store_id) {
                    arrayOficialStoreName.push([filter.seller.id ,filter.eshop.name])
                }
            }catch{
                return;
            } 
        })
        return arrayOficialStoreName;
    }

    const updateSetFilters = (filter) => {
      return  (filters.includes(filter)) ? null : setFilters([ ...filters, filter])
    }
       

    const [url, setUrl] = useState('')

    const location = useLocation().pathname;

    useEffect(()=>{
        setUrl(location)
    }, [location])
           
    return (
        <Fragment>
             {dataSearch.length > 0 ? 
                <div className = 'w-100'>
                     <div
                         className = 'search__aside-titleContainer'
                     >
                         { dataSearch[0]?.filters.length > 0 ? pathProduct(dataSearch).map( path => 
                            <ol className = 'search__aside-titleContainer-path'>

                                {path.values[0].path_from_root.reverse().map( (pathIndex, index) => 
                                    <li className = 'search__aside-titleContainer-path-pathName'>
                                        <Link className = 'search__aside-titleContainer-path-pathName-link'>{pathIndex.name}</Link>
                                        {index === path.values[0].path_from_root.length -1 ? null : 
                                            <svg className = 'search__aside-titleContainer-path-pathName-link-arrow' viewBox="0 0 9 14" xmlns="http://www.w3.org/2000/svg"><path  fill-rule="evenodd" d="M1 1.343L6.657 7 1 12.657"></path></svg>
                                        }
                                    </li>
                                )}
                            </ol>
                        ) : null }
                        <h1 className = 'search__aside-titleContainer-title'>
                            {searchParam}
                        </h1>
                        
                    </div>

                    <div
                        className= 'search__aside-quantity'
                    >
                        <span className = 'search__aside-quantity-results'>{dataSearch[0].results.length} resultados</span>
                    </div>

                    {(dataSearch.related_results > 0) ?  <div className = 'search__aside-relatedSearch'> 
                        {dataSearch.related_results.map( result => 
                            <div className = 'search__aside-relatedSearch-search'>
                                <div>
                                    <div className = 'search__aside-relatedSearch-search-nameContainer'>
                                        <p className = 'search__aside-relatedSearch-search-nameContainer-name'>Hola</p>
                                        <button className = 'search__aside-relatedSearch-search-cross'>
                                            <svg className="search__aside-relatedSearch-search-cross" viewBox="0 0 10 10">
                                                <path  d="M404 760l-1-1-4 4-4-4-1 1 4 4-4 4 1 1 4-4 4 4 1-1-4-4z"></path>
                                            </svg>
                                        </button>
                                    </div>                
                                </div>
                            </div>
                        )}
                    </div> 
                 : null}

                    <div className= 'search__aside-filters'>
                        {createFilterOficialSeller(dataSearch).length > 0 ?
                            <dl className= 'search__aside-filters-title'>
                                <dt className= 'search__aside-filters-title-name'>Tiendas Oficiales</dt>
                                {createFilterOficialSeller(dataSearch).map(modelo => 
                                    <dd>
                                        <Link 
                                            to = {`${url}/${modelo[0]}`}
                                            onClick = {() => updateSetFilters('seller_id')}
                                        >
                                            {modelo[1]}
                                        </Link>
                                    </dd>   
                                )}
                            </dl>
                        : null }

                        <dl className= 'search__aside-filters-title'>
                            <dt className= 'search__aside-filters-title-name'>Modelo</dt>
                            {createFilterItem(dataSearch, 'MODEL').map(modelo => 
                                <dd>
                                    <Link 
                                        to = {`${url}/${modelo[0]}`}
                                        onClick = {() => updateSetFilters('MODEL')}
                                    >
                                        {modelo[1]}
                                    </Link>
                                </dd>   
                            )}
                        </dl>

                        <dl className= 'search__aside-filters-title'>
                            <dt className= 'search__aside-filters-title-name'>Condición</dt>
                            {createFilterItem(dataSearch, 'ITEM_CONDITION').map(modelo => 
                                 <dd>
                                    <Link 
                                        to = {`${url}/${modelo[0]}`}
                                        replace = {true}
                                        onClick = {() => updateSetFilters('ITEM_CONDITION')}
                                    >
                                        {modelo[1]}
                                    </Link>
                                </dd>    
                            )}
                        </dl>

                        <dl className= 'search__aside-filters-title'>
                            <dt className= 'search__aside-filters-title-name'>Línea</dt>
                            {createFilterItem(dataSearch, 'LINE').map(modelo => 
                                <dd>
                                    <Link 
                                        to = {`${url}/${modelo[0]}`}
                                        onClick = {() => updateSetFilters('LINE')}
                                    >
                                        {modelo[1]}
                                    </Link>
                                </dd>    
                            )}
                        </dl>

                        <dl className= 'search__aside-filters-title'>
                            <dt className= 'search__aside-filters-title-name'>Ubicación</dt>  
                            {createFilterInfoSeller(dataSearch).map( (modelo, index) => 
                                 <dd>
                                 <Link 
                                     to = {`${url}/${modelo[0]}`}
                                     onClick = {() => updateSetFilters('seller_id')}
                                 >
                                     {modelo[1]}
                                 </Link>
                             </dd>    
                            )}
                        </dl>

                        <dl className= 'search__aside-filters-title'>
                            <dt className= 'search__aside-filters-title-name'>Detalles de la publicación</dt>
                            Mejores vendedores ({createFilterBestSeller(dataSearch)})
                        </dl>
                    </div>
                </div>
            : null }
        </Fragment>
    )
}

export default AsideSearch;
