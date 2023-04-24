const getIndex = (req, res) => {
  // sample data
  const question = {
    id: 1,
    option1: "Travel to the past",
    option2: "Travel to the future",
    voteCount1: 10,
    voteCount2: 20,
    createdBy: "supermario64",
  };
  const comments = [
    {
      comment: "I have no idea what to say",
      madeBy: "supermario64",
      questionId: 1,
    },
  ];
  // end sample data
  res.render("wyr-single.ejs", { question, comments });
};

module.exports = {
  questionController: {
    getIndex,
  },
};
