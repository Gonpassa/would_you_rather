const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  option1: {
    type: String,
    required: true,
  },
  option2: {
    type: Boolean,
    required: true,
  },
  voteCount1: {
    type: Number,
    required: true
  },
  voteCount2: {
    type: Number,
    required: true
  },
  createdBy: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Question', QuestionSchema);