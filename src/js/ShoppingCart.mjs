import getLocalStorage from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import getBackpackItems from "./backpack.js";

function cartItemTemplate(item, index) {
  const newItem = `
    <li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <button class="remove-btn" data-id="${item.Id}">X</button>
        <img src="${item.Images.PrimarySmall}" alt="${item.Name}" />
      </a>
      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${item.Colors[0].ColorName}</p>
      <p class="cart-card__quantity">qty: ${item.quantity}</p>
      <p class="cart-card__price">$${item.FinalPrice}</p>
    </li>
  `;
  return newItem;
}

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
    this.total = 0;

    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('remove-btn')) {
        const itemId = e.target.getAttribute('data-id');
        this.removeItemFromCart(itemId);
      }
    });   
  }
  calculateCartListTotal(cartListItems) {
    const amounts = cartListItems.map((item) => item.FinalPrice);
    this.total = amounts.reduce((sum, item) => sum + item);
  }

  renderCartContents() {
    const cartListItems = getLocalStorage(this.key) || [];
    if (!cartListItems.length) {
      document.querySelector(".product-list").innerHTML = "<p>Your cart is empty</p>";
      document.querySelector(".cart-total").innerHTML = "<p>Total: $0.00</p>";
      return;
    }

    const itemMap = new Map();

    cartListItems.forEach((item) => {
      if (itemMap.has(item.Id)) {
        itemMap.get(item.Id).quantity += 1;
      } else {
        itemMap.set(item.Id, { ...item, quantity: 1 });
      }
    });
    
    const htmlItems = [];
    itemMap.forEach((item, index) => {
      htmlItems.push(cartItemTemplate(item, index));
    });
    document.querySelector(this.parentSelector).innerHTML = htmlItems.join("");
    this.calculateCartListTotal(cartListItems);
    document.querySelector(".cart-total").innerHTML = `<p>Total: $${this.total.toFixed(2)}</p>`;
  }

  removeItemFromCart(itemId) {
    let cartItems = getLocalStorage(this.key) || [];
    const itemIndex = cartItems.findIndex(item => item.Id === itemId);
    
    if (itemIndex !== -1) {
      cartItems.splice(itemIndex, 1);
      localStorage.setItem(this.key, JSON.stringify(cartItems));
      this.renderCartContents();
      getBackpackItems();
    }
  }
}
