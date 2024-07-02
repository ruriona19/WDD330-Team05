import { loadHeaderFooter } from "./utils.mjs";

async function initialize() {
  try {
    await loadHeaderFooter();
  } catch (error) {
    /* eslint-disable no-console */
    console.error("Error loading header and footer:", error);
  }
}

initialize();
