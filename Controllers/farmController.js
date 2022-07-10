const db = require("./../settings/mySqlDb");

exports.getFarms = (req, res) => {
  const farms = "SELECT `ID`, `Farm_Name` FROM `farm`";

  db.query(farms, (error, results) => {
    if (error) {
      res.status(400).send({ message: error });
    } else {
      res.status(200).send({ user: results });
    }
  });
};

exports.createFarms = (req, res) => {
  const farms =
    "INSERT INTO `farm`(`Farm_Name`) VALUES('" + req.body.name + "')";

  db.query(farms, (error, results) => {
    if (error) {
      res.status(400).send({ message: error });
    } else {
      res.status(200).send({ user: results });
    }
  });
};

exports.updateFarms = (req, res) => {
  const farms =
    "UPDATE `farm` SET `Farm_Name` = '" +
    req.body.name +
    "' WHERE `ID` = '" +
    req.body.id +
    "'";

  db.query(farms, (error, results) => {
    if (error) {
      res.status(400).send({ message: error });
    } else {
      res.status(200).send({ user: results });
    }
  });
};

exports.deleteFarms = (req, res) => {
  const farms = "DELETE FROM `farm` WHERE `ID` = '" + req.params.id + "'";

  db.query(farms, (error, results) => {
    if (error) {
      res.status(400).send({ message: error });
    } else {
      res.status(200).send({ user: results });
    }
  });
};
