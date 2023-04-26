const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments");

router.get('/comments', commentsController.getComments);
router.post('/comments', commentsController.createComment);
router.delete('/comments', commentsController.deleteComment);

module.exports = router;