"use strict";

const db = require("./../settings/mySqlDb");
//get
exports.getSensors = (req, res) => {
  const sensors =
    "SELECT `ID`, `Coops_ID`, `Position`, `Device_ID`, `Type` FROM `sensors` WHERE `Coops_ID` = '" +
    req.params.id +
    "'";

  db.query(sensors, (error, results) => {
    if (error) {
      res.status(400).send({ message: error });
    } else {
      res.status(200).send({ result: results });
    }
  });
};

//post
exports.createDeviceId = (req, res) => {
  const sensorsSelect =
    "SELECT `ID`, `Coops_ID`, `Position`, `Device_ID`, `Type` FROM `sensors` WHERE `Device_ID` = '" +
    req.body.deviceId +
    "'";

  db.query(sensorsSelect, (error, sensorsResults) => {
    if (sensorsResults.length) {
      res.status(400).send({ message: error || 'That device id name already used.' });
    } else {
      const sensors =
        "UPDATE `sensors` SET `Device_ID` = '" +
        req.body.deviceId +
        "' WHERE `ID` = '" +
        req.body.id +
        "'";

      db.query(sensors, (error, results) => {
        if (error) {
          res
            .status(400)
            .send({ message: "That device id name already used", error });
        } else {
          res.status(200).send({ result: results });
        }
      });
    }
  });
};
