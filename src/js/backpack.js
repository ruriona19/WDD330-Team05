import getLocalStorage from "./utils.mjs";

export default function getBackpackItems() {
    const items = getLocalStorage("so-cart") || [];
    const backpack = document.getElementsByTagName("sup")[0];
    backpack.textContent = items.length;
}

getBackpackItems();