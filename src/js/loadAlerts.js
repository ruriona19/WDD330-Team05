import Alert from "./Alert.js";

document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch("/json/alerts.json");
    const alerts = await response.json();
    const alert = new Alert(alerts);
    alert.appendAlertsToPage();
});
