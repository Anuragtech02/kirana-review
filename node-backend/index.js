const express = require("express");
const dotenv = require("dotenv");
const db = require("./config/db");
const bodyParser = require("body-parser");
const productsRotuer = require("./routes/products");
const categoryRouter = require("./routes/category");
const subcategoryRouter = require("./routes/subcategory");
const reviewsRouter = require("./routes/reviews");

dotenv.config({ path: "./config/config.env" });

db.connectDB();

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on ${PORT}`)
);

// app.get("/createdb", (req, res) => {
//   let sql = "CREATE DATABASE kiranareview";
//   db.conn.query(sql, (err, result) => {
//     if (err) {
//       throw err;
//     }
//     console.log(result);
//     res.send("Database created...");
//   });
// });

app.use("/api/products", productsRotuer);
app.use("/api/categories", categoryRouter);
app.use("/api/subcategories", subcategoryRouter);
app.use("/api/reviews", reviewsRouter);