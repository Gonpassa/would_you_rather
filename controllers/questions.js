/* TO BE DELETED LATER */
const User = require("../models/User")
const Question = require("../models/Question");
const Comment = require("../models/Comment");

const getIndex = async (req, res) => {
  try {
    //Get array of questionsIds that the user already voted on
    const questionsVoted = await User.find({questionVoted: req.user.id})
    
    //Get all question documents in db
    const questionsArr = await Question.find()

    //If user has not voted yet generate random question
    if(questionsVoted.length < 1){
      //Select random question document
      const randIndex = Math.floor(Math.random() * questionsArr.length - 1)
      const question = questionsArr[randIndex]
      
      //Get comments for question
      const comments = await Comment.find({questionId: question._id})

      //Add matching username to each comment
      for(let comment of comments){
        const user = await User.findById(comment.madeBy)
        comment.userName = user.userName
      }

      //Render page with new question and comments for the question
      return res.render("wyr-single.ejs", {
        question: question,
        commentsForQuestion: comments,
        user: req.user
      });
    }

    
    //Get array of questions that user has not voted
    



    //find one question that has an id not in the array
    const question = await Question.find({})
    //render the question, and the comments for that question. 

    const questionCount = await Question.countDocuments();

    // Get the question id from session storage, initialize if not set
    req.session.voteQuestionIds = req.session.votedQuestionIds || [];

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
        user: req.user
      });
    } else {
      // All questions have been voted on
      // Clear the session storage and display a message to the user
      req.session.votedQuestionIds = [];

      res.render("wyr-single.ejs", {
        question: null,
        commentsForQuestion: [],
        allVoted: true,
        user: req.user });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const updateVote = async (req,res) => {
  const optionText = req.body.optionSelected;
  const questionId = req.body.questionId
  res.json('done')
  try {
    
  } catch (err) {
    
  }
}
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
    updateVote,
  },
};

/* To Be Deleted Later End*/
