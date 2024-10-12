import { loadHeaderFooter, displayTotalItemInCart } from './utils.mjs'

async function init() {
  await loadHeaderFooter()
  displayTotalItemInCart()
}

init()
