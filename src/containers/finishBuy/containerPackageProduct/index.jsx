import PackageProduct from './PackageProduct'

const ContainerPackageProduct = () => {
    return (
        <div className = 'col-lg-7'>
            <div>
                <h1>Opcines de envío a</h1>
                <div>
                    <svg viewBox="0 0 100 100" role="presentation" class="ui-icon ui-icon--location ui-badge__icon ui-badge__icon--medium">#eeeeee</svg>
                    <div>
                        <h3>direccion</h3>
                        <p>Nombre</p>
                    </div>

                    <div>
                        <PackageProduct />
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default PackageProduct
