import ShoppingCart from "./ShoppingCart.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import getBackpackItems from "./backpack.js";
import getLocalStorage from "./utils.mjs";

async function showProductListFooter(cartListTotalPrice) {
  if (cartListTotalPrice > 0) {
    // show our checkout button and total if there are items in the cart.
    document.querySelector(".product-list-footer").classList.remove("hide");
  } else {
    document.querySelector(".product-list-footer").classList.add("hide");
  }
}

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
      cart.renderCartContents;
      const cartListItems = getLocalStorage(this.key) || [];
      if (cartListItems.length == 0) {
        let total = 0;
        showProductListFooter(total);
      }
    });

    showProductListFooter(cart.total);
  } catch (error) {
    /* eslint-disable no-console */
    console.error("Error loading header and footer:", error);
  }
}

document.addEventListener("DOMContentLoaded", initialize);
