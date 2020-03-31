const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  blogTitle: {
    type: String,
    required: true,
    unique: true
  },
  blogContent: {
    type: String,
    required: true
  },
  blogAuthor: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("blogs", blogSchema);
