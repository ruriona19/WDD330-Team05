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
  constructor(category, dataSource, listElement, sortProductsBy = "name") {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.sortProductsBy = sortProductsBy;
  }

  async init() {
    const list = await this.getCurrentProductList();
    const sortedList = this.sortList(list, this.sortProductsBy);
    this.renderList(sortedList);
  }

  async getCurrentProductList() {
    const currentProductlist = await this.dataSource.getData(this.category); 
    return currentProductlist;
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list, "afterBegin", true);
  }

  sortList(listOfProducts, sortProductsBy) {
    let sortedProducts = [];

    if(sortProductsBy == "name"){
      sortedProducts = (listOfProducts || []).sort((a, b) =>
        a.Name.localeCompare(b.Name)
      );
    }
    else if(sortProductsBy == "price"){
      sortedProducts = (listOfProducts || []).sort((a, b) =>
        (a.FinalPrice < b.FinalPrice) - (a.FinalPrice > b.FinalPrice)
      );
    }
    return sortedProducts;
  }
}