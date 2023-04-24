const getIndex = (req, res) => {
  // sample data
  const question = {
    id: 1,
    text: "Would you rather travel to the past or the future?",
    optionA: "Travel to the past",
    optionB: "Travel to the future",
  };
  const comments = [
    "Great question!",
    "I prefer the past.",
    "Interesting poll!",
  ];
  // end sample data
  res.render("copy.ejs", { question, comments, user: req.user });
};

module.exports = {
  questionController: {
    getIndex,
  },
};
