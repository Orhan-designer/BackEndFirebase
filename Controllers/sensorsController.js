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

  const sensorsSelect =
    "SELECT `ID`, `Coops_ID`, `Position`, `Device_ID`, `Type` FROM `sensors` WHERE `Device_ID` = '" +
    req.body.deviceId +
    "'";
  console.log(sensorsSelect)

  db.query(sensorsSelect, (error, sensorsResults) => {
    if (sensorsResults.length) {
      console.log('res in if', sensorsResults)
      res.status(400).send({ message: error || 'That device id name already used.' });
    } else {
      const sensors =
        "UPDATE `sensors` SET `Device_ID` = '" +
        req.body.deviceId +
        "' WHERE `Coops_ID` = '" +
        req.body.id +
        "'";
      console.log('sensors', sensors)

      db.query(sensors, (error, results) => {
        if (error) {
          res
            .status(400)
            .send({ message: error });
        } else {
          res
            .status(200)
            .send({ result: results });
        }
      });
    }
    // if (sensorsResults.length) {
    //   console.log('res in if', req.body)
    //   res.status(400).send({ message: error || 'That device id name already used.' });
    // } else {
    //   for (let i = 1; i < req.body.length; i++) {
    //     const sensors =
    //       "UPDATE `sensors` SET `Device_ID` = '" +
    //       req.body[i].Device_ID +
    //       "' WHERE `Coops_ID` = '" +
    //       req.body.id +
    //       "'";

    //     db.query(sensors, (error, results) => {
    //       if (error) {
    //         res
    //           .status(400)
    //           .send({ message: error });
    //       } else {
    //         console.log(results)
    //         sensorsResults[i] = results;
    //       }
    //     });
    //     res.status(200).send({ result: sensorsResults });
    //   }
    // }
  });
};
