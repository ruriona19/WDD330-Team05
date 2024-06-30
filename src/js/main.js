
import { loadHeaderFooter } from "./utils.mjs";
import getBackpackItems from "./backpack.js";

async function initialize() {
  try {
    await loadHeaderFooter();
    getBackpackItems();

  } catch (error) {
    /* eslint-disable no-console */
    console.error("Error loading header and footer:", error);
  }
}

initialize();
