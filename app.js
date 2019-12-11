/**
 * api/app.js
 * exports an express app started.
 */

const express = require("express");
const app = express();

const bodyParser = require("body-parser");

//middleware to parse requests of extended urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
//middleware to parse requests of content-type - application/json
app.use(bodyParser.json());

//endpoints
app.get("/", (req, res) => {
  res.send({ message: "Yabadabadooo" });
});

module.exports = app;
