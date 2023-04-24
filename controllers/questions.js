let questionCounter = 0;

const getIndex = async (req, res) => {
  try {
    const questions = [
      {
        id: 1,
        option1: "Travel to the past",
        option2: "Travel to the future",
        voteCount1: 1,
        voteCount2: 2,
        createdBy: "user1",
      },
      {
        id: 2,
        option1: "have telekinesis",
        option2: "have telepathy",
        voteCount1: 2,
        voteCount2: 1,
        createdBy: "user2",
      },
      {
        id: 3,
        option1: "have universal respect",
        option2: "unlimited power",
        voteCount1: 3,
        voteCount2: 0,
        createdBy: "user3",
      },
    ];
    const comments = [
      {
        comment: "comment for question 1",
        madeBy: "anonymous",
        questionId: 1,
      },
      {
        comment: "comment for question 2",
        madeBy: "anonymous1",
        questionId: 2,
      },
      {
        comment: "comment for question 3",
        madeBy: "anonymous2",
        questionId: 3,
      },
    ];

    // Get the next question in the array
    const currentQuestion = questions[questionCounter];

    // Increment the question counter for the next iteration
    questionCounter = (questionCounter + 1) % questions.length;

    // Fetch comments associated with the current question
    const commentsForQuestion = comments.filter(
      (comment) => comment.questionId === currentQuestion.id
    );

    res.render("wyr-single.ejs", {
      question: currentQuestion,
      commentsForQuestion,
    });
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
