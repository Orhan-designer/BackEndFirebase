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
      results = results.map(x => {
        return {
          ...x,
          Device_ID: x.Device_ID ? x.Device_ID : ''
        }
      })
      res.status(200).send({ result: results });
    }
  });
};

//post
exports.createDeviceId = async (req, res) => {
  if (req.body.length) {
    let filteredIds = req.body.filter(el => el.Device_ID)
    console.log(req.body)
    if ((new Set(filteredIds.map(x => x.Device_ID))).size !== filteredIds.length) {
      res.status(400).send({ result: 'Some names are duplicates' });
      return;
    }
  }

  // if ((new Set(req.body.map(x => x.Device_ID))).size !== req.body.length) {
  //   res.status(400).send({ result: 'Some names are duplicates or empty' });
  //   return;
  // }

  let results = [];
  let promises = [];

  for (let i = 0; i < req.body.length; i++) {
    const sensors =
      "UPDATE `sensors` SET `Device_ID` = '" +
      req.body[i].Device_ID +
      "' WHERE `ID` = '" +
      req.body[i].ID +
      "'";

    promises.push(new Promise((resolve) => {
      db.query(sensors, (error, sensorsResult) => {
        results.push(sensorsResult)
        resolve(1);
      });
    }))

  }
  await Promise.all(promises);
  res.status(200).send({ result: results })
  //res.status(400).send({ message: error || 'That device id name already used.' });
};
