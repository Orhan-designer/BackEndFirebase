const db = require("./../settings/mySqlDb");

exports.getCoops = (req, res) => {
  console.log(req.params);
  const currentFarm = req.params.id;
  const coops =
    "SELECT `ID`, `Name`, `Farm_ID` FROM `coops` WHERE `ID` = '" +
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
  //   console.log(req);
  const coops =
    "INSERT INTO `coops` (`Name`, `Farm_ID`) VALUES('" +
    req.body.name +
    "', '" +
    req.body.id +
    "')";

  db.query(coops, (error, results) => {
    if (error) {
      res.send({ message: error });
    } else {
      res.send({ result: results });
    }
  });
};
