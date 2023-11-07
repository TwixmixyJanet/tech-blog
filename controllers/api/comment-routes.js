// IMPORTS
const router = require('express').Router();
const { BlogPost, Comment, User } = require('../../models');

// Post route at base URL to post a comment
router.post('/', async (req, res) => {
    try {
        console.log("Time to post a comment");
        // Create comment using the follow data
        const comment = await Comment.create({
            comment_body: req.body.comment_body, 
            blogPost_id: req.body.blogPost_id,
            user_id: req.session.user_id || req.body.user_id,
        });
        res.status(200).json(comment);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Get all comments at base URL
router.get('/', async (req, res) => {
    try {
        // Find all comments
        const commentData = await Comment.findAll({
            include: [
                {
                    model: User,
                    attributes: ["username"],
                },
                {
                    model: BlogPost,
                    attributes: ["id"],
                },
            ],
        });
        res.status(200).json(commentData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Put update per ID
router.put('/:id', async (req, res) => {
    try {
        // Update comment based off ID
        const updatedComment = await Comment.update(req.body, {
            where: {
                id: req.params.id,
            },
        });

        // If doesn't exist, return error
        if (!updatedComment[0]) {
            res.status(400).json({ message: "There is no comment with that ID"});
            return;
        }
        console.log("Updated comment");
        res.status(200).json(updatedComment);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Delete route per ID
router.delete('/:id', async (req, res) => {
    try {
        // Destroy comment based off ID
        const comment = await Comment.destroy({
            where: {
                id: req.params.id,
            },
        });

        // If not found, return error
        if (!comment) {
            res.status(404).json({ message: "There is no comment with that ID" });
            return;
        }
        res.status(200).json(comment);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// EXPORT
module.exports = router;