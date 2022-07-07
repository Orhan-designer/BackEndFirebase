const db = require("./../settings/mySqlDb");

exports.getCoops = (req, res) => {
    const currentFarm = req.params.id;
    const coops =
        "SELECT `ID`, `Name`, `Farm_ID` FROM `coops` WHERE `Farm_ID` = '" +
        currentFarm +
        "'";

    db.query(coops, (error, results) => {
        if (error) {
            console.log(error);
        } else {
            res.send({ result: results });
        }
    });
};

exports.createCoops = (req, res) => {
    const coops =
        "INSERT INTO `coops` (`Name`, `Farm_ID`) VALUES('" + req.body.name + "', '" + req.body.id + "')";

    db.query(coops, (error, results) => {
        if (error) {
            res.send({ message: error });
        } else {

            let resultsForSensors = {}

            for (let i = 1; i < 7; i++) {
                const sensors =
                    "INSERT INTO `sensors`(`Coops_ID`, `position`, `Type`) VALUES('" + results.insertId + "', '" + i + "', '" + 1 + "')";

                db.query(sensors, (error, sensorResult) => {
                    if (error) {
                        res.send({ message: error })
                    } else {
                        results[i] = sensorResult
                    }
                })
            }

            res.send(resultsForSensors)

        }
    });
};

exports.updateCoops = (req, res) => {
    console.log(req)
    const coopId = req.body.ID;
    const coops =
        "UPDATE `coops` SET `Name` = '" + req.body.Name + "' WHERE `ID` = '" + req.body.ID + "'"

    db.query(coops, (error, results) => {
        if (error) {
            console.log(error);
        } else {
            res.send({ result: results });
        }
    });
};