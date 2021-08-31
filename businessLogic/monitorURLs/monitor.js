const Monitor = require("ping-monitor");
// //
const checkController = require("../../controllers/checkController");

let Notification = require("../alertStrategy/Notification");
let EmailAlert = require("../alertStrategy/emailNotification");
let WebHookNotification = require("../alertStrategy/webhookNotification");

let reportObj = {};

exports.monitorURLs = async () => {
  let checks = await checkController.getAll();

  console.log(checks);
  checks.forEach((check) => {
    const myMonitor = new Monitor({
      website: check.website,
      title: check.title,
      interval: check.interval,

      confing: {
        intervalUnits: "minutes", // seconds, milliseconds, minutes {default}, hours
      },

      httpOptions: {},
      expect: {
        statusCode: 200,
      },
    });

    if (check.isStopped) {
      myMonitor.stop();
    }

    reportObj = {
      website: check.website,
      Availabiliity: myMonitor.isUp,
      responsetime: myMonitor.time,
      requests: myMonitor.totalRequests,
      totalDownTimes: myMonitor.totalDownTimes,
    };

    console.log(reportObj);
    let notification = new Notification();

    myMonitor.on("up", function (res, state) {
      if (check.webhook) {
        notification.setNotificationStrategy(new WebHookNotification(check));
        notification.sendNotification("Your web Site is UP", res.website);
        notification.sendNotification(
          "Your web Site is UP",
          JSON.stringify(reportObj)
        );
      }
      notification.setNotificationStrategy(new EmailAlert(check.user));
      notification.sendNotification("Your web Site is UP", "Alert!", res.website);
      notification.sendNotification("Your web Site is UP", "Report",JSON.stringify(reportObj));

      console.log("Yay!! " + res.website + " is up.");
    });

    myMonitor.on("down", function (res) {
      
      if (check.webhook) {
        notification.setNotificationStrategy(new WebHookNotification(check));
        notification.sendNotification("Your web Site is Down", "");
      }
      notification.setNotificationStrategy(new EmailAlert(check.user));
      notification.sendNotification("Your web Site is Down", res.statusMessage);

      if (myMonitor.totalDownTimes == check.threshold) {
        notification.sendNotification("Threshold!!!", res.statusMessage);
      }

      console.log(
        "Oh Snap!! " + res.website + " is down! " + res.statusMessage
      );
    });

    myMonitor.on("stop", function (website) {
      console.log(website + " monitor has stopped.");
    });

    myMonitor.on("error", function (error) {
      console.log(error);
    });
  });
};
