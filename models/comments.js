const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
    unique: true
  },
  author: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("comments", commentSchema);
//hello from dean
