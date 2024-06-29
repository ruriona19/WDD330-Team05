import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  let htmlString = "";
  if (product.Images) {
    htmlString = `<li class="product-card">
      <a href="/product_pages/index.html?product=${product.Id}">
        <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}">
        <h3 class="card__brand">${product.NameWithoutBrand}</h3>
        <h2 class="card__name">${product.Name}</h2>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>`;
  }
  return htmlString;
}

export default class ProductListing {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);
  }
  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }



}