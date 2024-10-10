import ExternalServices from './ExternalServices.mjs'
import ProductListing from './ProductList.mjs'
import { loadHeaderFooter, displayTotalItemInCart, getParams } from './utils.mjs'

await loadHeaderFooter()
displayTotalItemInCart()

const category = getParams("category");
const dataSource = new ExternalServices()
const listElement = document.querySelector('.product-list')
const productList = new ProductListing(category, dataSource, listElement)
productList.init()
