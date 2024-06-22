import Alert from './Alert.js';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('/json/alerts.json');
    const alerts = await response.json();
    const alert = new Alert(alerts);
    alert.appendAlertsToPage();
  } catch (error) {
    console.error('Error loading alerts:', error);
  }
});
