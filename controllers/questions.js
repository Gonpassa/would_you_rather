/* TO BE DELETED LATER */

const Question = require("../models/Question");
const Comment = require("../models/Comment");

const getIndex = async (req, res) => {
  try {
    //   const questions = [
    //     {
    //       id: 1,
    //       option1: "Travel to the past",
    //       option2: "Travel to the future",
    //       voteCount1: 1,
    //       voteCount2: 2,
    //       createdBy: "user1",
    //     },
    //     {
    //       id: 2,
    //       option1: "have telekinesis",
    //       option2: "have telepathy",
    //       voteCount1: 2,
    //       voteCount2: 1,
    //       createdBy: "user2",
    //     },
    //     {
    //       id: 3,
    //       option1: "have universal respect",
    //       option2: "unlimited power",
    //       voteCount1: 3,
    //       voteCount2: 0,
    //       createdBy: "user3",
    //     },
    //   ];
    //   const comments = [
    //     {
    //       comment: "comment for question 1",
    //       madeBy: "anonymous",
    //       questionId: 1,
    //     },
    //     {
    //       comment: "comment for question 2",
    //       madeBy: "anonymous1",
    //       questionId: 2,
    //     },
    //     {
    //       comment: "comment for question 3",
    //       madeBy: "anonymous2",
    //       questionId: 3,
    //     },
    //   ];

    const questionCount = await Question.countDocuments();

    // Get the question id from session storage, initialize if not set
    req.session.votedQuestionIds = req.session.votedQuestionIds || [];

    // Find a question that hasn't been voted on yet
    const unvotedQuestion = await Question.findOne({
      _id: { $nin: req.session.votedQuestionIds },
    });


    if (unvotedQuestion) {
      // Add the question id to the session storage
      req.session.votedQuestionIds.push(unvotedQuestion._id);

      // Get comments for the current question
      const commentsForQuestion = await Comment.find({
        questionId: unvotedQuestion._id,
      });

      res.render("wyr-single.ejs", {
        question: unvotedQuestion,
        commentsForQuestion,
      });
    } else {
      // All questions have been voted on
      // Clear the session storage and display a message to the user
      req.session.votedQuestionIds = [];

      res.render("wyr-single.ejs", {
        question: null,
        commentsForQuestion: [],
        allVoted: true,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

/*

const getIndex = async (req, res) => {
  try {
    const questionCount = await Question.countDocuments();
    const randomIndex = Math.floor(Math.random() * questionCount);
    const randomQuestion = await Question.findOne().skip(randomIndex);
    const comments = await Comment.find({ questionId: randomQuestion._id });
    res.render("wyr-single.ejs", { question: randomQuestion, comments });

  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};
const createComment = async(req,res) => {
  try{
    const newComment = await Comment.create({
      comment: req.body.comment,
      madeBy: req.user.username,
      questionId: req.body.questionId,
    });
   res.redirect(`/question/${req.body.questionId}`);
  }catch(err){
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
}
};
*/

module.exports = {
  questionController: {
    getIndex,
  },
};

/* To Be Deleted Later End*/
