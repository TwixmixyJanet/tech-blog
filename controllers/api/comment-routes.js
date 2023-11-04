// imports
const router = require('express').Router();
const { BlogPost, Comment, User } = require('../../models');

router.post('/', async (req, res) => {
    try {
        console.log("Looks like we've made it");
        const comment = await Comment.create({
            comment_body: req.body.commet_body, 
            blogPost_id: req.body.blogPost_id,
            user_id: req.session.user_id || req.body.user_id,
        });
        res.status(200).json(comment);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/', async (req, res) => {
    try {
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

router.put('/:id', async (req, res) => {
    try {
        const updatedComment = await Comment.update(req.body, {
            where: {
                id: req.params.id,
            },
        });

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

router.delete('/:id', async (req, res) => {
    try {
        const comment = await Comment.destroy({
            where: {
                id: req.params.id,
            },
        });

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

// exports
module.exports = router;