require("express-async-errors");  // TO MAP ERRORS AUTOMATICALLY TO errorHandling middleware!
const express = require("express");

const errorHandling = require('./middleware/errorMW');

const monitor = require('./businessLogic/monitorURLs/monitor')

require("./log/logging")();
require("./startup/dbConnection.js")();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello");
});


// setInterval(function(){ 
  // monitor.monitorURLs()
// }, 1000000);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
}); 

require("./startup/routes")(app);
app.use(errorHandling)

app.listen(3001, () => console.log("monitoring is listening on port 3001"));
