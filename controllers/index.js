const BlogSchema = require('../models/blog');
const UserSchema = require('../models/user');
const CommentSchema = require('../models/comments');

exports.getIndex = async (req, res) => {
  let postInfo = await BlogSchema.find();
  let commentInfo = await CommentSchema.find();
  let posts = postInfo.map(post => post.toObject());
  let comments = commentInfo.map(comment => comment.toObject());

  res.render('index', { posts, comments });
};

exports.getPost = async (req, res) => {
  let individualPost = await BlogSchema.findById('5ea85e520a626511eaa8d996');
  // let posts = individualPost.map(post => post.toObect());
  let posts = individualPost.toObject();
  console.log(posts);

  // newPostInfo.push({
  //   title: individualPost.blogTitle,
  //   content: individualPost.blogContent,
  //   author: individualPost.blogAuthor,
  //   category: individualPost.category,
  //   createdOn: individualPost.createdOn.toUTCString(),
  //   ID: individualPost._id,
  // });

  console.log(posts);


  res.render('posts', { posts });
}

exports.postIndex = async (req, res) => {
  console.log(req.params);

  res.render('edit', { id: req.params.id });
};

exports.postEdit = async (req, res) => {
  let post = await BlogSchema.findById(req.params.id);
  let title = req.body.title || post.title;
  let content = req.body.content || post.content;
  let category = req.body.category || post.title;
  let author = req.body.author || post.author;

  await BlogSchema.findByIdAndUpdate(req.params.id, {
    title,
    content,
    category,
    author,
  });
  res.redirect('/');
};

exports.postDelete = async (req, res) => {
  await BlogSchema.findByIdAndRemove(req.params.id, {});

  res.redirect('/');
};

exports.getSignup = async (req, res) => {
  let allUsers = await UserSchema.find({});
  console.log(allUsers);
  res.render('signup');
};

exports.postSignup = async (req, res) => {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  let existingUser = await UserSchema.findOne({ email });
  if (existingUser) {
    let err = new Error(
      `${email}A user with that email has already registered.`,
    );

    err.status = 400;
    console.log(err);
    res.render('signup', {
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

  res.redirect('/');
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

  res.render('comment');
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
  res.redirect('/');
};

exports.getDean = (req, res) => {
  res.render('dean');
};

exports.getWrite = async (req, res) => {
  let category = await BlogSchema.find({});
  let existingCategories = [];

  for (const obj of category) {
    existingCategories.push(
      obj.category
    );
  }

  console.log(existingCategories)

  // for (let i = 0; i < existingCategories.length; i++) {
  //   console.log(existingCategories[i]);
  // }

  res.render('write', { existingCategories });
};

exports.postWrite = async (req, res) => {
  let { title, content, author, category } = req.body;


  const newBlog = new BlogSchema({
    title,
    content,
    author,
    category,
    createdOn: Date.now(),
    upVotes: 0,
  });

  await newBlog.save(); // javascript was gigiddy.
  res.redirect('/');
};
