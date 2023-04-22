// const Question = require('../models/Question')

module.exports = {
  getQuestion: async (req, res) => {
    console.log(req.user);
    try {
      const Questions = await Question.find({ userId: req.user.id });
    } catch (err) {
      console.log(err);
    }
  },
  createComment: async (req, res) => {

  },
  markComplete: async (req, res) => {
    try {
      await Todo.findOneAndUpdate(
        { _id: req.body.todoIdFromJSFile },
        {
          completed: true,
        }
      );
      console.log("Marked Complete");
      res.json("Marked Complete");
    } catch (err) {
      console.log(err);
    }
  },
  markIncomplete: async (req, res) => {
    try {
      await Todo.findOneAndUpdate(
        { _id: req.body.todoIdFromJSFile },
        {
          completed: false,
        }
      );
      console.log("Marked Incomplete");
      res.json("Marked Incomplete");
    } catch (err) {
      console.log(err);
    }
  },

};
