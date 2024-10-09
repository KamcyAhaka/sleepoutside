import { renderListWithTemplate } from './utils.mjs'

function productCardTemplate(product) {
  return `
  <li class="product-card">
    <a href="product_pages/?product=${product.Id}">
      <img
        src="${product.Image}"
      />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">${product.FinalPrice}</p>
    </a>
  </li>
  `
}

const filteredList = list => list.filter((item, index) => index <= 3) 

export default class ProductListing {
  constructor(category, dataSource, listElement) {
    this.category = category
    this.dataSource = dataSource
    this.listElement = listElement
  }

  async init() {
    const list = await this.dataSource.getData(this.category);
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, filteredList(list))
  }
}
