import getLocalStorage, { setLocalStorage } from "./utils.mjs";

function getDiscountPercentage(oldPrice, newPrice) {
  let oPrice = Number(oldPrice),
  nPrice = Number(newPrice);
  if (nPrice > oPrice) {
    let percentage = nPrice / oPrice * 100 - 100;
    let additionPercentage = parseInt(percentage) + "% UP";
    return additionPercentage;
  } else if (nPrice < oPrice) {
    let percentage = -nPrice / oPrice * 100 + 100;
    let discountPercentage = parseInt(percentage) + "% OFF";
    return discountPercentage;
  }
};

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
  }

  init() {
    this.renderProductDetails(this.dataSource);
  }

  addToCart(product) {
    let cart = getLocalStorage("so-cart") || [];
    cart.push(product);
    setLocalStorage("so-cart", cart);
  }

  renderProductDetails() {
    const discountAmount = Math.floor(Math.random() * (50 - 9) + 9);

    const pDescription = document.querySelector('.product__description');
    const pName = document.getElementById('product_name');
    const pClassification = document.getElementById('product_classification');
    const pColor = document.querySelector('.product__color');
    const pPrice = document.querySelector('.product-card__price');
    const pRetailPrice = document.querySelector('.line-through');
    const img = document.querySelector('#product_image');
    const discountFlag = document.querySelector("#discountFlag")
    const title = document.querySelector('title');
    const btn = document.getElementById('addToCart');

    pName.innerHTML = this.dataSource["Name"];
    pDescription.innerHTML = this.dataSource["DescriptionHtmlSimple"];  
    pClassification.innerHTML = this.dataSource["NameWithoutBrand"];
    pColor.innerHTML = "<b>Color:</b> " + this.dataSource["Colors"][0]["ColorName"];
    pPrice.innerHTML = "$"  + this.dataSource["FinalPrice"];
    pRetailPrice.innerHTML = "$" + this.dataSource["SuggestedRetailPrice"];
    img.src = this.dataSource["Images"]["PrimaryLarge"];
    img.alt = this.dataSource["Name"];
    discountFlag.innerHTML = getDiscountPercentage(this.dataSource["SuggestedRetailPrice"], this.dataSource["FinalPrice"]);
    btn.setAttribute('data-id', this.dataSource["Id"]);
    title.innerHTML = "Sleep Outside | " + this.dataSource["Name"];
  }
}
