// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

export function formDataToJSON(formInputs) {
  const convertedJSON = {};
  
  formInputs.forEach(input => {
    convertedJSON[input.id] = input.value;
  });

  return convertedJSON;
}

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParams(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param)  
  return product;
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  const templateStrings = list.map(templateFn);
  // if clear is true we need to clear out the contents of the parent.
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, templateStrings.join(""));
}

export function calculateCartTotalPrice() {
  const cartItems = getLocalStorage("so-cart");
  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.FinalPrice;
  }, 0);

  return +totalPrice.toFixed(2);
}

export function displayTotalItemInCart() {
  const cartItems = getLocalStorage("so-cart");
  if (!cartItems) {
    return
  }
  const cartItemTotalIndicator = document.querySelector("#cart-total");
  cartItemTotalIndicator.classList.remove("hide");
  cartItemTotalIndicator.textContent = cartItems.length;
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.insertAdjacentHTML("afterbegin", template);
  if(callback) {
    callback(data);
  }
}

export function capitalizeFirstLetter(word) {
  if (!word) return '';
  return word.charAt(0).toUpperCase() + word.slice(1);
}

async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;

}

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("../partials/header.html");
  const headerElement = document.querySelector("#site-header");
  const footerTemplate = await loadTemplate("../partials/footer.html");
  const footerElement = document.querySelector("#site-footer");

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
}

function attachAlertEventListeners() {
  const alertBtns = document.querySelectorAll('.alert__delete-btn')
  const alertContainer = document.querySelector('.alert-container')

  alertBtns.forEach(alertBtn => {
    alertBtn.addEventListener('click', event => {
      const targetBtn = event.target
      const parentAlert = targetBtn.closest('.alert')
      alertContainer.removeChild(parentAlert)
    })
  });
}

export function alertMessageTemplate(message) {
  const alert = `
    <div class="alert">
      <p class="alert__text">${message}</p>
      <button class="alert__delete-btn">X</button>
    </div>
  `;

  return alert
}

export function alertMessage(message, scroll = true) {
  // create element to hold our alert
  const alertContainer = document.querySelector('.alert-container');

  alertContainer.insertAdjacentHTML('afterbegin', alertMessageTemplate(message))

  attachAlertEventListeners()

  // make sure they see the alert by scrolling to the top of the window
  //we may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
  if(scroll)
    window.scrollTo(0,0);
}
