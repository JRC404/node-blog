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
const getPost = require("./lib/getPost");

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

const indexRoutes = require("./controllers/index");
app.get("/", indexRoutes.getIndex);

app.get("/write", indexRoutes.getWrite);
app.post("/write", indexRoutes.postWrite);

app.post("/posts/:id", indexRoutes.postIndex);
app.post("/edit/:id", indexRoutes.postEdit);
app.post("/delete/posts/:id", indexRoutes.postDelete);

app.get("/signup", indexRoutes.getSignup);
app.post("/signup", indexRoutes.postSignup);

app.get("/comment", indexRoutes.getComment);

app.get("/dean", indexRoutes.getDean);

app.use((req, res, next) => {
  // req, res and next are all able to be used inside of this function
  if (res.status(404)) {
    res.render("404"); // we need a 404.hbs
    return; // to leave the if statement
  }
  next(); // runs the next middleware function... is there one to run?
});

app.listen(process.env.PORT || 3005, () => {
  console.log("I am listening on port 3005.");
});
