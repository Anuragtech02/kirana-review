const mysql = require("mysql");

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "kiranareview",
  port: 3307
});

const connectDB = async () => {
  await conn.connect((err) => {
    if (err) {
      throw err;
    }
    console.log("MySQL connected");
  });
};

module.exports = { connectDB, conn };
