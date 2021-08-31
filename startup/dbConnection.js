const mongoose = require("mongoose");
const winston = require("winston");
module.exports = function () {
  mongoose
    .connect("mongodb://localhost/monitorDB")
    .then(() => winston.info("connected to db "));
};
