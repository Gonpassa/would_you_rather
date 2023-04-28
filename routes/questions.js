const express = require("express");
const router = express.Router();
const {questionController} = require("../controllers/questions");
const { ensureAuth } = require("../middleware/auth");
const commentsController = require("../controllers/comments")
// const { getIndex } = require("../controllers/home");


router.get("/", ensureAuth, questionController.getIndex);
router.put("/vote", questionController.updateVote)
/* below possible for later?  */

// router.post("/", questionController.addQuestion);
// router.delete("/:id", questionController.deleteQuestion);


/* end of possible code needed for later*/

module.exports =  router ;
