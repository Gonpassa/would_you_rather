const express = require("express");
const router = express.Router();
const {questionController} = require("../controllers/questions");
const { ensureAuth } = require("../middleware/auth");
// const { getIndex } = require("../controllers/home");


router.get("/", ensureAuth, questionController.getIndex);

/* below possible for later?  */

// router.get("/question/:id", (req, res) => {
//   const question = {
//     id: req.params.id,
//     text: "Would you rather travel to the past or the future?",
//     optionA: "Travel to the past",
//     optionB: "Travel to the future",
//   };
//   res.render("question", { question });
// });

/* end of possible code needed for later*/

module.exports =  router ;
