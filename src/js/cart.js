import ShoppingCart from "./ShoppingCart.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import getBackpackItems from "./backpack.js";

async function initialize() {
  try {
    await loadHeaderFooter();
    getBackpackItems();
    const cart = new ShoppingCart("so-cart", ".product-list");
    cart.renderCartContents();

    document.addEventListener("click", function (event) {
      if (event.target.matches(".remove-btn")) {
        const index = event.target.getAttribute("data-index");
        cart.removeItemFromCart(index);
      }
    });
  } catch (error) {
    /* eslint-disable no-console */
    console.error("Error loading header and footer:", error);
  }
}

document.querySelector("button").addEventListener("click", () => {
  alert("Checkout in progress!");
});

document.addEventListener("DOMContentLoaded", initialize);
