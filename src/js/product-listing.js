import ExternalServices from './ExternalServices.mjs'
import ProductListing from './ProductList.mjs'
import { loadHeaderFooter, displayTotalItemInCart, getParams } from './utils.mjs'

async function init() {
  await loadHeaderFooter()
  displayTotalItemInCart()
}

init()

const category = getParams("category");
const dataSource = new ExternalServices()
const listElement = document.querySelector('.product-list')
const productList = new ProductListing(category, dataSource, listElement)
productList.init()
