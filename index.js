const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const databaseConnection = require("./config/mongoose.js");
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded());
app.use(cors());

// Database Connection
const db_connection = require("./config/mongoose");

app.use("/", require("./routes"));
app.listen(8000, () => {
  console.log("Server running");
});
