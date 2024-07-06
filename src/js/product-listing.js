import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

async function initialize() {
  await loadHeaderFooter();
  const category = getParam("category");
  // first create an instance of our ProductData class.
  const dataSource = new ExternalServices();
  // then get the element we want the product list to render in
  const listElement = document.querySelector(".product-list");
  // then create an instance of our ProductList class and send it the correct information.
  const myList = new ProductList(category, dataSource, listElement);
  // finally call the init method to show our products

  // ----------------------------------------
  const breadcrumbs = document.querySelector(".breadcrumbs");
  const number_items = await dataSource.getData(category);
  breadcrumbs.innerHTML = `${myList.category}--->${number_items.length} items`;
  // -----------------------------------------

  const sorBySelect = document.querySelector("#sort");

  //This event listener sort the list of product according the value selected in Sort By select element
  sorBySelect.addEventListener("input", async (e) => {
    const sortedProductsBy = e.target.value;
    let currentList = await myList.getCurrentProductList();
    let sortedList = await myList.sortList(currentList, sortedProductsBy);
    myList.renderList(sortedList);
  });

  myList.init();
}

initialize();
