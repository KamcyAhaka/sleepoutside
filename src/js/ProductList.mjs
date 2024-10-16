import { capitalizeFirstLetter, renderListWithTemplate } from './utils.mjs'

function productCardTemplate(product) {
  return `
  <li class="product-card">
    <a href="/product_pages/index.html?product=${product.Id}">
      <img
        src="${product.Images.PrimaryMedium}"
        alt="Image of ${product.Name}"
      />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.Name}</h2>
      <div class="price-container">
        <p class="product-card__price">$${product.FinalPrice}</p>
        <p class="product-card__suggestedRetailPrice">$${product.SuggestedRetailPrice}</p>
      </div>
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
    // render the list
    this.renderList(list);
    //set the title to the current category
    document.querySelector(".title").innerHTML = capitalizeFirstLetter(this.category);
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, filteredList(list))
  }
}
