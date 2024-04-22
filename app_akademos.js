const express = require("express");
// const bodyParser = require('body-parser');
const cors = require("cors");
const postgressDbConnection = require("./utils/connection");

require("dotenv").config();
const mongoose = require("mongoose");
var path = require("path");
const dataRouter = require("./routes/main-route");
const app = express()
app.use(cors());
app.use(express.json({ limit: "50mb" }));
const { Sequelize } = require('sequelize');
async function testConnection() {
  try {
    await postgressDbConnection.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
testConnection();


app.use("/", dataRouter);
const uploads = require("./routes/uploads");
app.use("/uploads", uploads);
app.use(express.static(__dirname + "/uploads"));

app.listen((port = 3000), (hostname = "0.0.0.0"), () => {
  console.log(`Example app listening at http://localhost:3000`);
});
  