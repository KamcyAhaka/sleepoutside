import { loadHeaderFooter, displayTotalItemInCart, getLocalStorage } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess";

async function init() {
  await loadHeaderFooter()
  displayTotalItemInCart()
}

init()

const checkoutProcess = new CheckoutProcess()
const checkoutForm = document.querySelector('#checkout-form')
const checkoutFormBtn = document.querySelector('#checkout-btn')


// Function to handle form submission and validation
function handleCheckoutFormSubmit(event) {
  event.preventDefault(); // Prevent form from submitting normally

  const formElements = [...checkoutForm.elements]
  const formInputs = formElements.filter((element) => element.tagName === 'INPUT')

  checkoutProcess.checkout(formInputs)
}

// Attach event listener to the form submit button
checkoutFormBtn.addEventListener('click', handleCheckoutFormSubmit);


checkoutProcess.init()
