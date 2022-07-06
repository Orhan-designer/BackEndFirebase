const db = require('./../settings/mySqlDb')

exports.getCoops = (req, res) => {
    const currentFarm = req.params.id;
    const coops = "SELECT `ID`, `Name` FROM `coops` WHERE `ID` = '" + currentFarm + "'";

    db.query(coops, (error, results) => {
        if (error) {
            console.log(error)
        } else {
            res.send({ result: results })
        }
    })
};


exports.createCoops = (req, res) => {
    const coops = "INSERT INTO `coops`(`Name`, `Farm_ID`) VALUES('" + req.body.name + "', '" + req.body.id + "')"

    db.query(coops, (error, results) => {
        if (error) {
            console.log(error)
        } else {
            res.send({ result: results })
        }
    })
};