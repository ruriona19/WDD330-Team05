export default class Alert {
    constructor(alerts) {
      this.alerts = alerts;
    }
  
    createAlertElement(alert) {
      const alertElement = document.createElement("p");
      alertElement.textContent = alert.message;
      alertElement.style.backgroundColor = alert.background;
      alertElement.style.color = alert.color;
      return alertElement;
    }
  
    appendAlertsToPage() {
      if (this.alerts.length > 0) {
        const alertList = document.createElement("section");
        alertList.className = "alert-list";
        this.alerts.forEach(alert => {
          const alertElement = this.createAlertElement(alert);
          alertList.appendChild(alertElement);
        });
        const mainElement = document.querySelector("main");
        mainElement.prepend(alertList);
      }
    }
  }
  