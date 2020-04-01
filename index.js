const express = require("express");
const path = require("path");
const hbs = require("express-handlebars");
const bodyParser = require("body-parser");
require("dotenv").config();

const mongoose = require("mongoose");
const BlogSchema = require("./models/blog");
const UserSchema = require("./models/user");
const CommentSchema = require("./models/comments");

mongoose.connect(
  `mongodb+srv://${process.env.Username}:${process.env.Password}@${process.env.DatabaseURL}`,
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

app.post("/write", async (req, res) => {
  let blogTitle = req.body.blogTitle;
  let blogContent = req.body.blogContent;
  let blogAuthor = req.body.blogAuthor;

  const newBlog = new BlogSchema({
    blogTitle: blogTitle,
    blogContent: blogContent,
    blogAuthor: blogAuthor,
    createdOn: Date.now(),
    upVotes: 0
  });

  await newBlog.save(); // javascript was gigiddy.
  res.redirect("/");
});

app.get("/", async (req, res) => {
  let postInfo = await BlogSchema.find({});
  let newPostInfo = [];

  for (const obj of postInfo) {
    newPostInfo.push({
      title: obj.blogTitle,
      content: obj.blogContent,
      author: obj.blogAuthor,
      createdOn: obj.createdOn.toUTCString(),
      ID: obj._id
    });
  }
  res.render("index", { newPostInfo });
});

app.post("/posts/:id", (req, res) => {
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

app.post("/delete/posts/:id", async (req, res) => {
  await BlogSchema.findByIdAndRemove(req.params.id, {});

  res.redirect("/");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signup", async (req, res) => {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;

  let existingUser = await UserSchema.findOne({ email });

  if (existingUser) {
    let err = new Error(
      `${email}A user with that email has already registered.`
    );

    err.status = 400;
    console.log(err);
    res.render("signup", {
      errorMessage: `${email} already taken. A user with that email has already registered.`
    });
    return;
  }

  const user = new UserSchema({
    username: username,
    email: email,
    password: password
  });
  user.save();

  res.redirect("/");
});

app.get("/dean", (req, res) => {
  res.render("dean");
});

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
