import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import getBackpackItems from "./backpack.js";

document.addEventListener("DOMContentLoaded", async () => {
  // Wait for the header and footer to be loaded before initializing other parts of the page
  await loadHeaderFooter();

  const productId = getParam("product");
  const dataSource = new ProductData();
  const productData = await dataSource.findProductById(productId);

  const productDetails = new ProductDetails(productId, productData);
  await productDetails.init();

  document
    .getElementById("addToCart")
    .addEventListener("click", (e) => addToCartHandler(e, productDetails));

  // renaming the parameter productDetails to pDetails because I got the following lint error after
  // execute: "npm run lint"
  // error  'productDetails' is already declared in the upper scope on line 10 column 9
  async function addToCartHandler(e, pDetails) {
    const product = pDetails.dataSource;
    pDetails.addToCart(product);
    getBackpackItems();
    const cartElement = document.querySelector(".cart");
    cartElement.scrollIntoView({ behavior: "smooth" });
  }

  // After the header and footer are loaded, update the backpack items count
  getBackpackItems();
});
