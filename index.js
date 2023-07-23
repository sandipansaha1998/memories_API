const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded());
app.use(cors());

// Database Connection
const db_connection = require("./config/mongoose");
db_connection().then(() => {
  app.use("/", require("./routes"));
  app.listen(8000, () => {
    console.log("Server running");
  });
});
