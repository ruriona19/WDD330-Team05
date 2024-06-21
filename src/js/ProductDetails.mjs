import getLocalStorage, { setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
  }

  init() {
    this.renderProductDetails();
  }

  addToCart(product) {
    let cart = getLocalStorage("so-cart") || [];
    cart.push(product);
    setLocalStorage("so-cart", cart);
  }

  renderProductDetails() {
    const pDescription = document.querySelector('.product__description');
    const pName = document.getElementById('product_name');
    const pClassification = document.getElementById('product_classification');
    const pColor = document.querySelector('.product__color');
    const pPrice = document.querySelector('.product-card__price');
    const img = document.querySelector('#product_image');
    const title = document.querySelector('title');
    const btn = document.getElementById('addToCart');

    pName.innerHTML = this.dataSource["Name"];
    pDescription.innerHTML = this.dataSource["DescriptionHtmlSimple"];
    pClassification.innerHTML = this.dataSource["NameWithoutBrand"];
    pColor.innerHTML = this.dataSource["Colors"][0]["ColorName"];
    pPrice.innerHTML = this.dataSource["FinalPrice"];
    img.src = this.dataSource["Image"];
    img.alt = this.dataSource["Name"];
    btn.setAttribute('data-id', this.dataSource["Id"]);
    title.innerHTML = "Sleep Outside | " + this.dataSource["Name"];
  }
}
