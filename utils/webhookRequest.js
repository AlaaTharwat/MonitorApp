const fetch = require("node-fetch");

exports.sendViaWebhook = (URL, msg, subject) => {
  const webhookURL = URL;

  const data = JSON.stringify({
    msg
  });

  fetch(webhookURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: data,
  }).then((response) => {
    console.log(response);
  });
};
