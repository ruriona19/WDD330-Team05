import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const dataSource = new ProductData("tents");

const pList = document.querySelector(".product-list");
const list = new ProductList("Tents", dataSource, pList);

list.init();
