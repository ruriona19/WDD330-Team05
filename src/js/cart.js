import getLocalStorage from "./utils.mjs";
import getBackpackItems from "./backpack.js";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
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

  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  const total = cartItems.reduce((acc, item) => acc + item.FinalPrice, 0);
  document.querySelector(".cart-total").innerHTML =
    `<p>Total: $${total.toFixed(2)}</p>`;
}

document.querySelector("button").addEventListener("click", () => {
  alert("Checkout in progress!");
});

function cartItemTemplate(item, index) {
  const newItem = `
                <li class="cart-card divider">
                    <a href="#" class="cart-card__image">
                        <button class="remove-btn" data-index="${index}">X</button>
                        <img src="${item.Image}" alt="${item.Name}" />
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

export default function removeItemFromCart(itemIndex) {
  const cartItems = getLocalStorage("so-cart") || [];
  cartItems.splice(itemIndex, 1);
  localStorage.setItem("so-cart", JSON.stringify(cartItems));
  renderCartContents();
  getBackpackItems();
}

document.addEventListener("click", function (event) {
  if (event.target.matches(".remove-btn")) {
    const index = event.target.getAttribute("data-index");
    removeItemFromCart(index);
  }
});

renderCartContents();