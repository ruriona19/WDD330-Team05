import ExternalServices from "./ExternalServices.mjs";
import getLocalStorage from "./utils.mjs";
import { setLocalStorage } from "./utils.mjs";
const services = new ExternalServices();

function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

function packageItems(items) {
  const simplifiedItems = items.map((item) => {
    return {
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: 1,
    };
  });
  return simplifiedItems;
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
    this.orderSummarySection = document.getElementById('orderSummarySection');
  }

  init() {
    this.list = getLocalStorage(this.key);
    this.calculateItemSummary();
  }

  calculateItemSummary() {
    const summaryElement = document.querySelector(
      this.outputSelector + " #cartTotal"
    );
    const itemNumElement = document.querySelector(
      this.outputSelector + " #num-items"
    );
    itemNumElement.innerText = this.list.length;
    const amounts = this.list.map((item) => item.FinalPrice);
    this.itemTotal = amounts.reduce((sum, item) => sum + item);
    summaryElement.innerText = "$" + this.itemTotal;
  }

  calculateOrdertotal() {
    this.shipping = 10 + (this.list.length - 1) * 2;
    this.tax = (this.itemTotal * 0.06).toFixed(2);
    this.orderTotal = (
      parseFloat(this.itemTotal) +
      parseFloat(this.shipping) +
      parseFloat(this.tax)
    ).toFixed(2);
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    const shipping = document.querySelector(this.outputSelector + " #shipping");
    const tax = document.querySelector(this.outputSelector + " #tax");
    const orderTotal = document.querySelector(
      this.outputSelector + " #orderTotal"
    );
    shipping.innerText = "$" + this.shipping;
    tax.innerText = "$" + this.tax;
    orderTotal.innerText = "$" + this.orderTotal;

    // Show order summary section when ready
    this.orderSummarySection.style.display = "block";
  }

  async checkout() {
    const formElement = document.forms["checkout"];
    const json = formDataToJSON(formElement);

    if (this.isFormComplete(formElement)) {
      json.orderDate = new Date();
      json.orderTotal = this.orderTotal;
      json.tax = this.tax;
      json.shipping = this.shipping;
      json.items = packageItems(this.list);

      try {
        await services.checkout(json);
        setLocalStorage("so-cart", []);
        location.assign("../checkout/success.html");
      } catch (err) {
        const key = Object.keys(err.message)[0];
        const input = document.querySelector(`[name=${key}]`);
        input.focus();
        input.setCustomValidity(err.message[key]);
        setTimeout(() => {
          input.setCustomValidity("");
        }, 1500);
        input.reportValidity(); 
      }
    } else {
      alert("Please fill out all required fields.");
    }
  }

  isFormComplete(formElement) {
    // Example validation: Check if all required inputs are filled
    const requiredInputs = formElement.querySelectorAll('input[required]');
    return [...requiredInputs].every(input => input.value.trim() !== '');
  }
}
