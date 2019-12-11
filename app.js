/**
 * api/app.js
 * exports an express app started.
 */
process.env.JWT_KEY = "thisIsMyJwtKeyUsedToEncodeTheTokens";
const express = require("express");
const app = express();
const routes = require("./routes");

const bodyParser = require("body-parser");

//middleware to parse requests of extended urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
//middleware to parse requests of content-type - application/json
app.use(bodyParser.json());

app.use(routes);
//endpoints
app.get("/", (req, res) => {
  res.send({ message: "Yabadabadooo" });
});

module.exports = app;
