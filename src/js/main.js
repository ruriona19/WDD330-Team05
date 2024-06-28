import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import getBackpackItems from "./backpack.js";

async function initialize() {
    const dataSource = new ProductData("tents");
    const pList = document.querySelector(".product-list");
    const list = new ProductList("Tents", dataSource, pList);

    try {
        await loadHeaderFooter();
        getBackpackItems();
        list.init();
    } catch (error) {
        console.error("Error loading header and footer:", error);
    }
}

initialize();
