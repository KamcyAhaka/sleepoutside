import { loadHeaderFooter, displayTotalItemInCart } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess";

await loadHeaderFooter();
displayTotalItemInCart()

const checkoutProcess = new CheckoutProcess()
checkoutProcess.init()
