import { getParams, loadHeaderFooter, displayTotalItemInCart } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";

await loadHeaderFooter();
displayTotalItemInCart()

const productId = getParams('product');

const dataSource = new ExternalServices('tents');

const product = new ProductDetails(productId, dataSource);
product.init();
