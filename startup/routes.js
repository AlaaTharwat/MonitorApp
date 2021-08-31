const users = require("../routes/userRoute");
 const auth = require("../routes/authRoute");
 const check = require('../routes/checkRoute')

module.exports = function (app) {
  app.use('/api/user', users);
  app.use('/api/auth', auth);
  app.use('/api/check', check)
};
