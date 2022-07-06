"use strict";

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT || 3500;
const connection = require('./settings/mySqlDb')

app.use(cors());
connection.connect((error) => {
  if (error) {
    return console.log("Failed to connect to data base...");
  } else {
    return console.log("Connect has been successful...");
  }
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const route = require("./settings/routes");
route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
