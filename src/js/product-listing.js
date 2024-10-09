import ProductData from './ProductData.mjs'
import ProductListing from './ProductList.mjs'
import { loadHeaderFooter, displayTotalItemInCart, getParams } from './utils.mjs'

await loadHeaderFooter()
displayTotalItemInCart()

const category = getParams("category");
const dataSource = new ProductData()
const listElement = document.querySelector('.product-list')
const productList = new ProductListing(category, dataSource, listElement)
productList.init()
