"use strict";

const db = require("./../settings/mySqlDb");
//get
exports.getSensors = (req, res) => {
  const sensors =
    "SELECT `ID`, `Coops_ID`, `Position`, `Device_ID`, `Type` FROM `sensors` WHERE `Coops_ID` = '" + req.params.id + "'";

  db.query(sensors, (error, results) => {
    if (error) {
      res.send({ message: error });
    } else {
      res.send({ result: results });
    }
  });
};

//post
exports.createDeviceId = (req, res) => {
  console.log(req)
  const sensors =
    "UPDATE `sensors` SET `Device_ID` = '" + req.body.deviceId + "' WHERE `ID` = '" + req.body.id + "'";

  db.query(sensors, (error, results) => {
    if (error) {
      res.send({ message: error });
    } else {
      res.send({ result: results });
    }
  });
};

//put
exports.updateSensors = (req, res) => { };

//delete
exports.deleteSensors = (req, res) => { };
