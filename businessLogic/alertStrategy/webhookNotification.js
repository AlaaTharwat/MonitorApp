const sendViaWebhook = require("../../utils/webhookRequest");

class WebHookNotification {
  constructor(check) {
    this.check = check;
  }

  sendNotification(msg, subject) {
    sendViaWebhook(this.check.webhook, msg, subject);
  }
}

module.exports = WebHookNotification;
