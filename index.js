const express = require("express");
const router = require("./routes");
const bodyParser = require("body-parser");

const app = express();

//app.use(express.static("./public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

app.listen(3000, (req, res) => {
  console.log("Server is running on port 3000");
});
