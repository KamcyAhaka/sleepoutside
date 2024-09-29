import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  // Get the current cart from localStorage
  let cartItems = getLocalStorage("so-cart");

  // If cartItems is not an array, initialize it as an empty array
  cartItems = Array.isArray(cartItems) ? cartItems : [];

  // Add the new product to the cart array
  cartItems.push(product);

  // Save the updated cart array back to localStorage
  setLocalStorage("so-cart", cartItems);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
