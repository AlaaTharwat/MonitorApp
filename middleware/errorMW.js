
const winston = require("winston");
let {handleError} =  require("../handlers/errorHandler");

module.exports = function (error, req, res, next) {
  winston.error(error.message, error);
  console.log("here error middleware")
  //console.log(error)
  handleError(error, res);
 // res.status(500).send(error.message);
};
