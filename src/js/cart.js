import ShoppingCart from "./ShoppingCart.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import getBackpackItems from "./backpack.js";

async function initialize() {
  try {
    await loadHeaderFooter();
    getBackpackItems();
    const cart = new ShoppingCart("so-cart", ".product-list");
    cart.renderCartContents();
  } catch (error) {
    /* eslint-disable no-console */
    console.error("Error loading header and footer:", error);
  }
}

document.addEventListener("DOMContentLoaded", initialize);
