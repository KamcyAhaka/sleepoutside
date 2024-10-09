import { calculateCartTotalPrice, getLocalStorage } from "./utils.mjs";

export default class CheckoutProcess{
  constructor() {
    this.tax = 0;
    this.shipping = 10;
    this.summary = 0;
  }

  init() {
    this.calculatAndDisplayTaxAndSubtotal()
    this.calculateAndDisplayShipping()
  }


  calculatAndDisplayTaxAndSubtotal() {
    const taxPercentage = 6
    const subtotal = calculateCartTotalPrice()
    const taxAmount = (taxPercentage / 100) * subtotal
    this.tax = taxAmount.toFixed(2)
    const subtotalElement = document.querySelector('#subtotal-price')
    const taxElement = document.querySelector('#tax')

    subtotalElement.textContent = `$${subtotal}`
    taxElement.textContent = `$${this.tax}`
  }

  calculateAndDisplayShipping() {
    const cartItems = getLocalStorage('so-cart')
    if (cartItems.length === 1) {
      return
    }

    if (cartItems.length > 1) {
      let shippingValue = this.shipping
      for (let index = 1; index < cartItems.length; index++) {
        shippingValue += 2
      }
      this.shipping = shippingValue
    }
    const shippingElement = document.querySelector('#shipping-estimate')

    shippingElement.textContent = `$${this.shipping}`
  }
}
