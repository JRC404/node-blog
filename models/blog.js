const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    required: true,
    unique: false,
  },
  author: {
    type: String,
    required: true,
  },
  upVotes: {
    type: Number,
    required: true,
    unique: false,
  },
  category: {
    type: String,
    required: true,
    unique: false,
  },
}, {
  toObject: {virtuals: true}
});

module.exports = mongoose.model('blogs', blogSchema);
