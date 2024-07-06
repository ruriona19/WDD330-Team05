import { loadHeaderFooter } from "./utils.mjs";

async function init() {
  await loadHeaderFooter();

  const messageElement = document.getElementById('message-success');
  messageElement.innerHTML += `<br>You will be redirected to the home page in <span id="countdown">5</span> seconds.`;
  document.body.appendChild(messageElement);

  setCountDown();
}

function setCountDown() {
  let countdown = 5;
  const countdownElement = document.getElementById('countdown');
  const intervalId = setInterval(function() {
    countdown--;
    countdownElement.textContent = countdown;
    if (countdown === 0) {
      clearInterval(intervalId);
      window.location.href = '/';
    }
  }, 1000);
}

document.addEventListener("DOMContentLoaded", init);
