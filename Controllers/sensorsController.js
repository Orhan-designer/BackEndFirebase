"use strict";

const db = require("./../settings/mySqlDb");
//get
exports.getSensors = (req, res) => {
  const sensors =
    "SELECT `ID`, `Coops_ID`, `Position`, `Device_ID`, `Type` FROM `sensors`";

  db.query(sensors, (error, results) => {
    if (error) {
      res.send({ message: error });
    } else {
      res.send({ result: results });
    }
  });
};

//post
exports.createSensors = (req, res) => {
  const sensors =
    "INSERT INTO `sensors`(`Coops_ID`, `Position`, `Device_ID`, `Type`) VALUES('" +
    +"')";

  db.query(sensors, (error, results) => {
    if (error) {
      res.send({ message: error });
    } else {
      res.send({ result: results });
    }
  });
};

//put
exports.updateSensors = (req, res) => {};

//delete
exports.deleteSensors = (req, res) => {};
