export const priceProduct = (price) =>{ 
  const newPrice =  price.toString().split('').reverse()
                            .map((num, index) => ((index + 1) % 3 === 0) ? num = '.' + num  : num).reverse()
    if(newPrice[0].includes('.')){
        newPrice[0] = newPrice[0].split('').splice(1, 1).join('')
    }
    newPrice.includes('..') && newPrice.splice(newPrice.indexOf('..'), 1, ',')
    return newPrice.join('')
}
