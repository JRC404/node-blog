const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  blogTitle: {
    type: String,
    required: true,
    unique: true,
  },
  blogContent: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    required: true,
    unique: false,
  },
  blogAuthor: {
    type: String,
    required: true,
  },
  upVotes: {
    type: Number,
    required: true,
    unique: false,
  },
});

module.exports = mongoose.model('blogs', blogSchema);
