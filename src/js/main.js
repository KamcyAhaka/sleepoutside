import ProductData from './ProductData.mjs'
import ProductListing from './ProductList.mjs'
import { loadHeaderFooter, displayTotalItemInCart } from './utils.mjs'

await loadHeaderFooter()
displayTotalItemInCart()


const dataSource = new ProductData('tents')
const listElement = document.querySelector('.product-list')
const productList = new ProductListing('tents', dataSource, listElement)
productList.init()
