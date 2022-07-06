const mysql = require("mysql2");
const config = require("./../mysqlConfig");

const connection = mysql.createConnection({
  host: config.HOST,
  user: config.DBUSER,
  database: config.DBNAME,
  password: config.DBPASSWORD,
});

// connection.connect((error) => {
//   if (error) {
//     return console.log("Failed to connect to data base...");
//   } else {
//     return console.log("Connect has been successful...");
//   }
// });

module.exports = connection;
