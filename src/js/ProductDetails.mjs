import { getLocalStorage, setLocalStorage } from './utils.mjs'

function createProductDetailTemplate(product) {
  return `<h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${product.Images.PrimaryLarge}"
      alt="${product.NameWithoutBrand}"
    />
    <p class="product-card__price">$${product.FinalPrice}</p>
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">
    ${product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div>`;
}

export default class ProductDetails {
  constructor(productId, dataSource) {
  this.productId = productId;
  this.product = {};
  this.dataSource = dataSource;
  }
  async init() {
    // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    this.product = await this.dataSource.findProductById(this.productId);

    // once we have the product details we can render out the HTML
    this.renderProductDetails('.product-detail')
    
    // once the HTML is rendered we can add a listener to Add to Cart button
    // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
    document.getElementById('addToCart')
      .addEventListener('click', this.addToCart.bind(this));
  }
  addToCart() {
    // Get the current cart from localStorage
    let cartItems = getLocalStorage("so-cart");

    // If cartItems is not an array, initialize it as an empty array
    cartItems = Array.isArray(cartItems) ? cartItems : [];

    // Add the new product to the cart array
    cartItems.push(this.product);

    // Save the updated cart array back to localStorage
    setLocalStorage("so-cart", cartItems);
  }
  renderProductDetails(parentSelector) {
    const parentElement = document.querySelector(parentSelector)
    parentElement.innerHTML = createProductDetailTemplate(this.product)
  }
}
