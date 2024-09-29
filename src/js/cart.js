import { getLocalStorage } from "./utils.mjs";

function displayCartTotal(cartItems) {
  const cartItemTotalIndicator = document.querySelector("#cart-total");
  const cartPriceTotalIndicator = document.querySelector("#cart-price-total");

  // Show elements
  cartItemTotalIndicator.classList.remove("hide");
  cartPriceTotalIndicator.classList.remove("hide");

  const totalPrice = calculateCartTotalPrice(cartItems);

  // Output values
  cartItemTotalIndicator.textContent = cartItems.length;
  cartPriceTotalIndicator.textContent = `$${totalPrice}`;
}

function calculateCartTotalPrice(cartItems) {
  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.FinalPrice;
  }, 0);

  return totalPrice;
}

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  if (cartItems && cartItems.length > 0) {
    displayCartTotal(cartItems);
  }
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
