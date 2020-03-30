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

app.get("/write", async (req, res) => {
  res.render("write");
});

app.post("/write", (req, res) => {
  let blogTitle = req.body.blogTitle;
  let blogContent = req.body.blogContent;
  let blogAuthor = req.body.blogAuthor;

  const newBlog = new BlogSchema({
    blogTitle: blogTitle,
    blogContent: blogContent,
    blogAuthor: blogAuthor
  });

  newBlog.save();
  res.redirect("/");
});

app.get("/", async (req, res) => {
  let postInfo = await BlogSchema.find({});
  //   console.log(postInfo);

  let newPostInfo = [];

  for (const obj of postInfo) {
    newPostInfo.push({
      title: obj.blogTitle,
      content: obj.blogContent,
      author: obj.blogAuthor,
      ID: obj._id
    });
  }
  res.render("index", { newPostInfo });
});

app.post("/:id", (req, res) => {
  console.log(req.params);

  res.render("edit", { id: req.params.id });
});

app.post("/edit/:id", async (req, res) => {
  let blogTitle = req.body.blogTitle;
  let blogContent = req.body.blogContent;
  let blogAuthor = req.body.blogAuthor;

  await BlogSchema.findByIdAndUpdate(req.params.id, {
    blogTitle: blogTitle,
    blogContent: blogContent,
    blogAuthor: blogAuthor
  });
  res.redirect("/");
});

app.listen(process.env.PORT || 3005, () => {
  console.log("I am listening on port 3005.");
});
