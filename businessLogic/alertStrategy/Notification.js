class Notification{
    constructor(){
        this.NotificationStrategy = ""
    }

    setNotificationStrategy(stragegy){
        this.NotificationStrategy = stragegy
    }

    sendNotification(msg, subject){
        return this.NotificationStrategy.sendNotification(msg, subject);
    }
}

module.exports = Notification;