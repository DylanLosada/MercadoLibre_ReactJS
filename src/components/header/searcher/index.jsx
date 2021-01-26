const Searcher = ({imgLupa}) => (
    <form className = 'header__searcher shadow rounded'>
        <input
            type = 'text'
            placeholder = 'Buscar productos, marcas y más...'
        ></input>
        <a type = 'button'>
            <div className = 'header__searcher-lupaButton'>
                <img src = {imgLupa} alt="Lupa" srcset=""/>
            </div>
        </a> 
        
    </form>
);

export default Searcher;