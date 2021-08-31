const jwt = require("jsonwebtoken");
require("dotenv").config();

let { ErrorHandler } = require("../handlers/errorHandler");


function auth(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) throw new ErrorHandler(401, "Access Denied!");

  try {
    const decodedPayLoad = jwt.verify(token, process.env.MONITOR_JWT_KEY);
    req.user = decodedPayLoad;
    next();

  } catch (error) {
    if (error.name === 'TokenExpiredError'){
      throw new ErrorHandler(401, error.name);
    }
    throw new ErrorHandler(401, "invalid token");

  }
}   

module.exports = auth;
