const getIndex = async (req, res) => {
  try {
    // sample data
    const questions = [
      {
        id: 1,
        option1: "Travel to the past",
        option2: "Travel to the future",
        voteCount1: 10,
        voteCount2: 20,
        createdBy: "supermario64",
      },
      {
        id: 2,
        option1: "have high intelligence",
        option2: "have psychic powers",
        voteCount1: 10,
        voteCount2: 20,
        createdBy: "megamind",
      },
      {
        id: 3,
        option1: "be a famous director",
        option2: "be a famous actor",
        voteCount1: 10,
        voteCount2: 20,
        createdBy: "scorseseforever",
      },
    ];
    const comments = [
      {
        comment: "hm time travel",
        madeBy: "anonymous",
        questionId: 1,
      },
      {
        comment: "hm time travel",
        madeBy: "anonymous",
        questionId: 1,
      },
      {
        comment: "hm time travel",
        madeBy: "anonymous",
        questionId: 1,
      },
      {
        comment: "haha",
        madeBy: "anonymous1",
        questionId: 2,
      },
      {
        comment: "haha",
        madeBy: "anonymous1",
        questionId: 2,
      },
      {
        comment: "neither?",
        madeBy: "anonymous2",
        questionId: 3,
      },
      {
        comment: "neither?",
        madeBy: "anonymous2",
        questionId: 3,
      },
      {
        comment: "neither?",
        madeBy: "anonymous2",
        questionId: 3,
      },
    ];
    const questionCount = questions.length;
    const randomIndex = Math.floor(Math.random() * questionCount);
    const commentsForQuestion = comments.filter((comment) => comment.questionId === questions[randomIndex].id);
    // end sample data
    res.render("wyr-single.ejs", { question: questions[randomIndex], commentsForQuestion });
  }
  catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
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
\   res.redirect(`/question/${req.body.questionId}`);
  }catch(err){
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
}
  */
};

module.exports = {
  questionController: {
    getIndex,
  },
};
