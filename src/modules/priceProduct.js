export const priceProduct = (price) => price.split('').reverse()
                            .map((num, index) => ((index + 1) % 3 === 0) ? num = '.' + num  : num).reverse().join('')
