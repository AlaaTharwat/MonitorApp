const { string } = require("joi");
const mongoose = require("mongoose");
require("dotenv").config();

const CheckSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  website: {
    type: String,
  },
  protocol: {
    type: String,
  },
  interval: {
    type: Number,
  },
  port: {
    type: Number,
  },
  path: {
    type: String,
  },
  threshold: {
    type: Number,
  },
  httpHeaders: [
    {
      key: {
        type: String,
      },
      value: {
        type: String,
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  isStopped:{
    type: Boolean,
    default: false
  },
  webhook:{
    type: String,

  }
});

const Check = mongoose.model("check", CheckSchema);

exports.Check = Check;

// webhook - A webhook URL to receive a notification on (optional).
// timeout (defaults to 5 seconds) - The timeout of the polling request (optional).
// interval (defaults to 10 minutes) - The time interval for polling requests (optional).
// threshold (defaults to 1 failure) - The threshold of failed requests that will create an alert (optional).
// authentication - An HTTP authentication header, with the Basic scheme, to be sent with the polling request (optional).
// authentication.username
// authentication.password
// httpHeaders - A list of key/value pairs custom HTTP headers to be sent with the polling request (optional).
// assert - The response assertion to be used on the polling response (optional).
// assert.statusCode: An HTTP status code to be asserted.
// tags - A list of the check tags (optional).
// ignoreSSL
