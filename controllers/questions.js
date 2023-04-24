const getIndex = (req, res) => {
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
      comment: "I have no idea what to say",
      madeBy: "supermario64",
      questionId: 1,
    },
  ];

  const questionCount = questions.length;
  const randomIndex = Math.floor(Math.random() * questionCount);

  const availableQuestions = questions.filter(
    (question) => question.id !== questions[randomIndex].id
  );

  if(availableQuestions.length === 0) {
    res.render("wyr-single.ejs", { question: questions[randomIndex], comments, noQuestions: true });
  }

  // end sample data
  res.render("wyr-single.ejs", { question: questions[randomIndex], comments });
  /*
const getIndex = async (req, res) => {
  try {
    const questionCount = await Question.countDocuments();
    const randomIndex = Math.floor(Math.random() * questionCount);
    const randomQuestion = await Question.findOne().skip(randomIndex);

    // Fetch comments associated with the random question
    const comments = await Comment.find({ questionId: randomQuestion._id });

    res.render("wyr-single.ejs", { question: randomQuestion, comments });
  } catch (err) {
    console.log(err);
  }
};
  */
};

module.exports = {
  questionController: {
    getIndex,
  },
};
