import { getParams } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

document.addEventListener("DOMContentLoaded", async () => {
  const dataSource = new ProductData("tents");
  const productId = getParams("product");
  const productData = await dataSource.findProductById(productId);

  const productDetails = new ProductDetails(productId, productData);
  productDetails.init();

  document
    .getElementById("addToCart")
    .addEventListener("click", (e) => addToCartHandler(e, productDetails));

  // renaming the parameter productDetails to pDetails because I got the following lint error after
  // execute: "npm run lint"
  // error  'productDetails' is already declared in the upper scope on line 10 column 9
  async function addToCartHandler(e, pDetails) {
    const product = pDetails.dataSource;
    pDetails.addToCart(product);
  }
});
