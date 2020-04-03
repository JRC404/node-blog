const BlogSchema = require("../models/blog");
const UserSchema = require("../models/user");
const CommentSchema = require("../models/comments");

exports.getIndex = async (req, res) => {
  let postInfo = await BlogSchema.find({});
  let commentInfo = await CommentSchema.find({});
  let newPostInfo = [];
  let newCommentInfo = [];

  for (const obj of postInfo) {
    newPostInfo.push({
      title: obj.blogTitle,
      content: obj.blogContent,
      author: obj.blogAuthor,
      createdOn: obj.createdOn.toUTCString(),
      ID: obj._id,
    });
  }

  for (const obj of commentInfo) {
    newCommentInfo.push({
      comment: obj.comment,
      commentAuthor: obj.author,
      createdOn: obj.createdOn.toUTCString(),
    });
  }
  console.log(newCommentInfo);
  res.render("index", { newPostInfo, newCommentInfo });
};

exports.postIndex = async (req, res) => {
  console.log(req.params);

  res.render("edit", { id: req.params.id });
};

exports.postEdit = async (req, res) => {
  let blogTitle = req.body.blogTitle;
  let blogContent = req.body.blogContent;
  let blogAuthor = req.body.blogAuthor;

  await BlogSchema.findByIdAndUpdate(req.params.id, {
    blogTitle: blogTitle,
    blogContent: blogContent,
    blogAuthor: blogAuthor,
  });
  res.redirect("/");
};

exports.postDelete = async (req, res) => {
  await BlogSchema.findByIdAndRemove(req.params.id, {});

  res.redirect("/");
};

exports.getSignup = (req, res) => {
  res.render("signup");
};

exports.postSignup = async (req, res) => {
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
      errorMessage: `${email} already taken. A user with that email has already registered.`,
    });
    return;
  }

  const user = new UserSchema({
    username: username,
    email: email,
    password: password,
  });
  user.save();

  res.redirect("/");
};

exports.getComment = async (req, res) => {
  let commentInfo = await CommentSchema.find({});
  let newCommentInfo = [];

  for (const obj of commentInfo) {
    newCommentInfo.push({
      comment: obj.comment,
      commentAuthor: obj.author,
    });
  }

  res.render("comment");
};

exports.postComment = async (req, res) => {
  let comment = req.body.comment;
  let author = req.body.author;

  const newComment = new CommentSchema({
    comment: comment,
    author: author,
    createdOn: Date.now(),
    upVotes: 0,
  });

  await newComment.save(); // javascript was gigiddy.
  res.redirect("/");
};

exports.getDean = (req, res) => {
  res.render("dean");
};

exports.getWrite = async (req, res) => {
  res.render("write");
};

exports.postWrite = async (req, res) => {
  let blogTitle = req.body.blogTitle;
  let blogContent = req.body.blogContent;
  let blogAuthor = req.body.blogAuthor;

  const newBlog = new BlogSchema({
    blogTitle: blogTitle,
    blogContent: blogContent,
    blogAuthor: blogAuthor,
    createdOn: Date.now(),
    upVotes: 0,
  });

  await newBlog.save(); // javascript was gigiddy.
  res.redirect("/");
};
