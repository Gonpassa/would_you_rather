const getIndex = (req, res) => {
  // sample data
  const question = {
    id: 1,
    text: "Would you rather travel to the past or the future?",
    option1: "Travel to the past",
    option2: "Travel to the future",
    voteCount1: 10,
    voteCount2: 20,
    createdBy: "supermario64",
  };

  /*
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
  */
  const comments = [
    "Great question!",
    "I prefer the past.",
    "Interesting poll!",
  ];
  // end sample data
  res.render("wyr-single.ejs", { question, comments });
};

module.exports = {
  questionController: {
    getIndex,
  },
};
