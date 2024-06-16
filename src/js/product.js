import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

/**
 * Add products to the cart
 * @param {*} product 
 */
function addProductToCart(product) {
  // Retrieve the current cart from localStorage
  let cart = getLocalStorage("so-cart") || [];
  // Add the new product to the cart array
  cart.push(product);
  // Save the updated cart back to localStorage
  setLocalStorage("so-cart", cart);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
