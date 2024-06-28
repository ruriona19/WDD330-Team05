import getLocalStorage from "./utils.mjs";

export default function getBackpackItems() {
    const items = getLocalStorage("so-cart") || [];
    const backpack = document.getElementById("backpack-sup");
    backpack.textContent = items.length;
}

