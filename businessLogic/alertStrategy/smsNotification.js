

class SMSNotification {
    constructor(user){
         this.user = user
    }

    sendNotification(msg, subject){
        sendEmail(this.user.phone, msg, subject)
    }
}

module.exports = SMSNotification;