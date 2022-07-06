const db = require('./../settings/mySqlDb')

exports.getFarms = (req, res) => {
    const farms = "SELECT `id`, `Farm_Name` FROM `farm`"

    db.query(farms, (error, results) => {
        if (error) {
            console.log(error)
        } else {
            res.send({ user: results })
        }
    })
};

exports.createFarm = (req, res) => {
    const farms = "INSERT INTO `farm` (`Farm_Name`) VALUES('" + req.body.name + "')"

    db.query(farms, (error, results) => {
        if (error) {
            console.log(error)
        } else {
            res.send({ user: results })
        }
    })
};