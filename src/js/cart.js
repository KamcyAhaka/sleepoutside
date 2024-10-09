import { getLocalStorage, loadHeaderFooter, displayTotalItemInCart, calculateCartTotalPrice } from "./utils.mjs";

await loadHeaderFooter()

displayTotalItemInCart()

function displayCartTotal() {
  const cartPriceTotalIndicator = document.querySelector("#cart-price-total");

  cartPriceTotalIndicator.classList.remove("hide");

  const totalPrice = calculateCartTotalPrice();

  cartPriceTotalIndicator.textContent = `$${totalPrice}`;
}

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  if (cartItems && cartItems.length > 0) {
    displayCartTotal(cartItems);
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
  }
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
