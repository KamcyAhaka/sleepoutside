import { getParams, loadHeaderFooter, displayTotalItemInCart } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

await loadHeaderFooter();
displayTotalItemInCart()

const productId = getParams('product');

const dataSource = new ProductData('tents');

const product = new ProductDetails(productId, dataSource);
product.init();
