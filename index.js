const express = require("express");
const request = require("request");
const path = require("path");
const hbs = require("express-handlebars");

const app = express();
const getPost = require("./lib/getPost");

app.use(express.static(path.join(__dirname, "public")));

app.engine(
  ".hbs",
  hbs({
    defaultLayout: "layout",
    extname: ".hbs"
  })
);

app.set("view engine", ".hbs");

app.get("/", async (req, res) => {
  res.render("index");
});

app.listen(3005, () => {
  console.log("I am listening on port 3005.");
});
