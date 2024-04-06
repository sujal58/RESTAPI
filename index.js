const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const sequelize = require("./config/db");
const bodyparser = require("body-parser");
const Customer = require("./models/Customer.js");
const Product = require("./models/Product.js");
const studentBook = require("./models/studentbook.js");

const port = process.env.PORT || 5001;

//
app.get("/", (req, res) => {
  res.send("Welcome to my server!!");
});

app.use(bodyparser.json());

app.use("/api/students", require("./routes/studentRoute"));
app.use("/api/author", require("./routes/authorRoutes"));
app.use("/api/book", require("./routes/bookRoutes"));
app.use("/api/customer", require("./routes/customerRoutes.js"));
app.use("/api/product", require("./routes/productRoutes.js"));
app.use("/api/file", require("./routes/fileRoutes.js"));

// sequelize.sync({ force: true });

sequelize.sync();

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully");
  app.listen(port, async () => {
    console.log(`http://localhost:${port}`);
  });
} catch (error) {
  console.log("unable to connect to the database", error);
}

//static page as a response
// const static_path = path.join(__dirname, "../frontend");
// app.use(express.static(static_path));
