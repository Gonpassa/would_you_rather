/* TO BE DELETED LATER */
const User = require("../models/User")
const Question = require("../models/Question");
const Comment = require("../models/Comment");

const getIndex = async (req, res) => {
  try {
    //Get user
    const user = await User.findOne({_id: req.user.id})
    //Get all question documents in db
    const questionsArr = await Question.find()

    //If user has not voted on any questions yet generate random question
    if(!user.questionsVoted.length){
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
    const unvotedQuestions = questionsArr.filter(q => user.questionsVoted.includes(q._id) ? 0 : 1)
    console.log(unvotedQuestions);
    if(!unvotedQuestions.length){
      return res.redirect('/logout')
    }
    const randIndex = Math.floor(Math.random() * unvotedQuestions.length)

    //Randomly pick a question
    const question = unvotedQuestions[randIndex]

    //Get comments for question
    const comments = await Comment.find({questionId: question._id})

    //Add matching username to each comment
    for(let comment of comments){
      const writer = await User.findById(comment.madeBy)
      comment.userName = writer.userName
    }

    res.render("wyr-single.ejs", {
      question: question,
      commentsForQuestion: comments,
      user: req.user });
    
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const updateVote = async (req,res) => {
  const optionText = req.body.optionSelected;
  const questionId = req.body.questionId
  try {
    //Push QuestionId into user questionsVoted Array and save
    const user = await User.findOne({_id: req.user.id})
    user.questionsVoted.push(questionId)
    await user.save()
    //Find voted question
    const question = await Question.findOne({_id: questionId})
    
    if(question.option1 == optionText){
      question.voteCount1++
      await question.save()
      return res.json(question)
    }
    question.voteCount2++
    await question.save()
    return res.json(question)
  } catch (err) {
    console.log(err);
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
