import { getParams } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

document.addEventListener("DOMContentLoaded", async () => {
  const dataSource = new ProductData("tents");
  const productId = getParams('product');
  const productData = await dataSource.findProductById(productId);

  const productDetails = new ProductDetails(productId, productData);
  productDetails.init();

  document
    .getElementById("addToCart")
    .addEventListener("click", (e) => addToCartHandler(e, productDetails));
  
  async function addToCartHandler(e, productDetails) {
    const product = productDetails.dataSource;
    productDetails.addToCart(product);
  }
});
