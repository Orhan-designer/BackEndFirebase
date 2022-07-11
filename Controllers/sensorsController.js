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
  console.log(req.body)

  let results = [];
  for (let i = 0; i < req.body.length; i++) {

    const sensors =
      "UPDATE `sensors` SET `Device_ID` = '" +
      req.body[i].Device_ID +
      "' WHERE `ID` = '" +
      req.body[i].ID +
      "'";

    db.query(sensors, (error, sensorsResults) => {
      if (sensorsResults.length) {
        res.status(400).send({ message: error || 'That device id name already used.' });
      } else {
        results.push(sensorsResults)
      }
    });
  }
  res.status(200).send({ result: results })
};
