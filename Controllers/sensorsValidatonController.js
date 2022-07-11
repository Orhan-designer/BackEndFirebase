'use strict'

const db = require("./../settings/mySqlDb");

exports.getValidDeviceId = (req, res) => {
    const sensorsSelect =
        "SELECT `ID`, `Coops_ID`, `Position`, `Device_ID`, `Type` FROM `sensors` WHERE `Device_ID` = '" +
        req.params.deviceId +
        "'";

    db.query(sensorsSelect, (error, sensorsResults) => {
        if (sensorsResults.length) {
            res.status(400).send({ message: error || 'Field device id is not valid.' });
        } else {
            res.status(200).send({ result: sensorsResults });
        }
    });
};