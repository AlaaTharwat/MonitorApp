
const sendEmail = require("../../utils/emailSending");

class EmailNotification {
    constructor(user){
         this.user = user
    }

    sendNotification(msg, subject){
        sendEmail(this.user.email, msg, subject)
    }
}

module.exports = EmailNotification;