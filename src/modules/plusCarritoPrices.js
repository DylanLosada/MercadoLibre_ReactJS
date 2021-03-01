const plusCarritoPrices = (carrito) => carrito.reduce( (acc, valorIndice)  => acc + valorIndice.price, 0)
export default plusCarritoPrices;