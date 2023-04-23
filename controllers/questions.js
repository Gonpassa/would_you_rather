const getIndex = (req, res) => {
  const question = {
    id: 1,
    text: "Would you rather travel to the past or the future?",
    optionA: "Travel to the past",
    optionB: "Travel to the future",
  };
  res.render("wyr-single.ejs", { question });
};

module.exports = {
  questionController: {
    getIndex,
  },
};
