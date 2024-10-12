import { getLocalStorage, loadHeaderFooter, displayTotalItemInCart, calculateCartTotalPrice, setLocalStorage } from "./utils.mjs";

async function init() {
  await loadHeaderFooter()
  displayTotalItemInCart()
}

init()

function attachEventListeners() {
  const deleteBtns = document.querySelectorAll('.delete-button')

  deleteBtns.forEach(button => {
    button.addEventListener('click', () => {
      const itemIndex = button.getAttribute('data-index');
      deleteItemFromCart(itemIndex);
    })
  });
}
  
function deleteItemFromCart(index) {
  const cartItems = getLocalStorage('so-cart')

  if (!cartItems) {
    return
  }

  cartItems.splice(index, 1); // Remove the item at the specific index

  // Save the updated cart back to localStorage
  setLocalStorage("so-cart", cartItems);

  // setLocalStorage('so-cart', newCartItems)
  renderCartContents()
}

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
    const htmlItems = cartItems.map((item, index) => cartItemTemplate(item, index));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
  }
  attachEventListeners()
}

function cartItemTemplate(item, index) {
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
  <button class="delete-button" data-index="${index}">
    <img src="/images/trash-can.svg" />
  </button>
</li>`;

  return newItem;
}

renderCartContents();
