import getLocalStorage from "./utils.mjs";
import {loadHeaderFooter} from "./utils.mjs";
import getBackpackItems from "./backpack.js";

function cartItemTemplate(item, index) {
  const newItem = `
                <li class="cart-card divider">
                    <a href="#" class="cart-card__image">
                        <button class="remove-btn" data-index="${index}">X</button>
                        <img src="${item.Images.PrimarySmall}" alt="${item.Name}" />
                    </a>
                    <a href="#">
                        <h2 class="card__name">${item.Name}</h2>
                    </a>
                    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
                    <p class="cart-card__quantity">qty: 1</p>
                    <p class="cart-card__price">$${item.FinalPrice}</p>
                </li>
            `;
  return newItem;
}
export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
  }

  renderCartContents() {
    const cartItems = getLocalStorage(this.key);
    if (!cartItems.length) {
      document.querySelector(".product-list").innerHTML =
        "<p>Your cart is empty</p>";
      document.querySelector(".cart-total").innerHTML = "<p>Total: $0.00</p>";
      return;
    }

    const htmlItems = [];
    cartItems.forEach((item, index) => {
      htmlItems.push(cartItemTemplate(item, index));
    });
    document.querySelector(this.parentSelector).innerHTML = htmlItems.join("");
    const total = cartItems.reduce((acc, item) => acc + item.FinalPrice, 0);
    document.querySelector(".cart-total").innerHTML =
      `<p>Total: $${total.toFixed(2)}</p>`;
  }

  removeItemFromCart(itemIndex) {
    const cartItems = getLocalStorage(this.key) || [];
    cartItems.splice(itemIndex, 1);
    localStorage.setItem(this.key, JSON.stringify(cartItems));
    this.renderCartContents();
    getBackpackItems();
  }


}