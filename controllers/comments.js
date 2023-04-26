const Comment = require('../models/Comment');

module.exports = {
    getComments: async (req, res) => {
        try {
            const comments = await Comment.find({questionId: req.body.questionId});
            res.json(comments);
        } catch(err) {
            console.log(err);
        }
    },
    createComment: async (req, res)=>{
        try {
            const comment = await Comment.create({comment: req.body.commentText, madeBy: req.user.id, questionId: req.body.questionId});
            console.log('Comment has been added!');
            res.json(comment);
        } catch(err) {
            console.log(err);
        }
    },
    deleteComment: async (req, res) => {
        console.log(req.body.commentId);
        try {
            await Comment.findOneAndDelete({_id: req.body.commentId});
            console.log('Deleted Comment');
            res.json('Deleted Comment');
        } catch(err) {
            console.log(err);
        }
    }
}

