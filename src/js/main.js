import { loadHeaderFooter } from "./utils.mjs";

async function initialize() {
  try {
    await loadHeaderFooter();
  } catch (error) {
    /* eslint-disable no-console */
    console.error("Error loading header and footer:", error);
  }
}
function firstVisit() {
  let counter = parseInt(localStorage.getItem("visit#"));
  if (isNaN(counter) || counter === null || counter === 0){
    const visit = document.querySelector(".visit");
    visit.innerHTML = "Hello! thank you for visiting us for the first time, please sign in to get multiple benefits in our website!";
    localStorage.setItem("visit#", 1);
  } else {
    const visit = document.querySelector(".visit");
    visit.innerHTML = "Thank you for comming back";
    counter = counter + 1;
    localStorage.setItem("visit#", counter)
  }
}

initialize();
firstVisit();
