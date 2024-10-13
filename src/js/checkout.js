import { loadHeaderFooter, displayTotalItemInCart } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess";

async function init() {
  await loadHeaderFooter()
  displayTotalItemInCart()
}

init()

function renderAlertTemplate(message) {
  return `
    <p>${message}</p>
    <button>X</button>
  `
}

const checkoutProcess = new CheckoutProcess()
const checkoutForm = document.querySelector('#checkout-form')
const checkoutFormBtn = document.querySelector('#checkout-btn')


// Function to handle form submission and validation
function handleCheckoutFormSubmit(event) {
  event.preventDefault(); // Prevent form from submitting normally

  const formElements = [...checkoutForm.elements]
  const formInputs = formElements.filter((element) => element.tagName === 'INPUT')

  if (checkoutForm.checkValidity()) {
    checkoutProcess.checkout(formInputs)
  } else {
    checkoutForm.reportValidity()
  }
}

// Attach event listener to the form submit button
checkoutFormBtn.addEventListener('click', handleCheckoutFormSubmit);


checkoutProcess.init()
