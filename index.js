const express = require("express");
const path = require("path");
const hbs = require("express-handlebars");
const bodyParser = require("body-parser");
require("dotenv").config();

const mongoose = require("mongoose");
const BlogSchema = require("./models/blog");

mongoose.connect(
  `mongodb+srv://${process.env.Username}:${process.env.Password}@cluster0-4fdtu.mongodb.net/blogInfo?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

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

app.get("/", async (req, res) => {
  res.render("index");
});

app.get("/blog", async (req, res) => {
  BlogSchema.find({}, (err, docs) => {
    let postInfo = docs;
    console.log(postInfo);
  });
  res.render("blog");
});

app.post("/", (req, res) => {
  let blogTitle = req.body.blogTitle;
  let blogContent = req.body.blogContent;
  let blogAuthor = req.body.blogAuthor;

  const newBlog = new BlogSchema({
    blogTitle: blogTitle,
    blogContent: blogContent,
    blogAuthor: blogAuthor
  });

  newBlog.save();
  res.render("index");
});

app.listen(3005, () => {
  console.log("I am listening on port 3005.");
});
