import ExternalServices from "./ExternalServices.mjs";
import { calculateCartTotalPrice, formDataToJSON, getLocalStorage } from "./utils.mjs";

const services = new ExternalServices()

function packageItem(cartItems) {
  const packagedItems = cartItems.map(item => ({
    id: item.Id,
    name: item.Name,
    price: item.FinalPrice,
    quantity: 1
  }))

  return packagedItems
}

export default class CheckoutProcess{
  constructor() {
    this.tax = 0;
    this.shipping = 0;
    this.orderTotal = 0;
    this.subtotal = calculateCartTotalPrice()
  }

  init() {
    // TODO: Implementation
    this.assignAndDisplayOrderSummary()
  }

  calculateTax() {
    const taxPercentage = 6
    const taxAmount = (taxPercentage / 100) * this.subtotal
    return +taxAmount.toFixed(2)
  }

  calculateShipping() {
    const baseValue = 10
    let shippingValue = baseValue
    const cartItems = getLocalStorage('so-cart')
    if (cartItems.length === 1) {
      return
    }

    if (cartItems.length > 1) {
      shippingValue = baseValue + cartItems.length * 2
    }
    return +shippingValue.toFixed(2)
  }

  calculateOrderTotal() {
    return +(this.tax + this.shipping + this.subtotal).toFixed(2)
  }

  displaySummary(subtotal, tax, shipping, orderTotal) {
    const subtotalElement = document.querySelector('#subtotal-price')
    const taxElement = document.querySelector('#tax')
    const shippingElement = document.querySelector('#shipping-estimate')
    const summaryElement = document.querySelector('#order')

    subtotalElement.textContent = `$${subtotal}`
    taxElement.textContent = `$${tax}`
    shippingElement.textContent = `$${shipping}`
    summaryElement.textContent = `$${orderTotal}`
  }

  assignAndDisplayOrderSummary() {
    this.tax = this.calculateTax()
    this.shipping = this.calculateShipping()
    this.orderTotal = this.calculateOrderTotal()
    this.displaySummary(this.subtotal, this.tax, this.shipping, this.orderTotal)
  }

  async checkout(formInputs) {
    const cartItems = getLocalStorage('so-cart')
    const checkoutObject = formDataToJSON(formInputs)
    checkoutObject.orderDate = new Date().toISOString()
    checkoutObject.orderTotal = this.orderTotal
    checkoutObject.shipping = this.shipping
    checkoutObject.tax = this.tax
    checkoutObject.items = packageItem(cartItems)

    console.log(checkoutObject);
    await services.checkout(checkoutObject)
  }
}
