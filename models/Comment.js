const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  madeBy: {
    type: String,
    required: true
  },
  questionId: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Comment', CommentSchema);