const express = require("express");
const path = require("path");
const hbs = require("express-handlebars");
const bodyParser = require("body-parser");
require("dotenv").config();

const mongoose = require("mongoose");

mongoose.connect(`${process.env.DatabaseURL}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const app = express();
const index = require("./routes/index");

app.use(express.static(path.join(__dirname, "public")));
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

app.engine(
  ".hbs",
  hbs({
    defaultLayout: "layout",
    extname: ".hbs"
  })
);

app.set("view engine", ".hbs");

app.use("/", index);
app.use((req, res, next) => {
  if (res.status(404)) {
    res.render("404");
    return;
  }
  next();
});

app.listen(process.env.PORT || 3005, () => {
  console.log("I am listening on port 3005.");
});
