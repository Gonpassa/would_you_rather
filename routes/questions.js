const express = require("express");
const router = express.Router();
const questionsController = require("../controllers/questions");
const { ensureAuth } = require("../middleware/auth");

// const { getIndex } = require("../controllers/home");

// router.get("/", getIndex);

// router.get("/question/:id", (req, res) => {
//   const question = {
//     id: req.params.id,
//     text: "Would you rather travel to the past or the future?",
//     optionA: "Travel to the past",
//     optionB: "Travel to the future",
//   };
//   res.render("question", { question });
// });

module.exports = { router };
