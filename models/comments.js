const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
    unique: false,
  },
  author: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    required: true,
    unique: false,
  },
  upVotes: {
    type: Number,
    required: true,
    unique: false,
  },
});

module.exports = mongoose.model("comments", commentSchema);
