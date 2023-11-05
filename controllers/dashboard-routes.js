// so it should be through dashboard routes that a user is able to edit or delete posts, rather than hompeage routes
// 6:00
// because if only a user can access their own posts via dashboard
// 6:00
// you could compare there the user_id to the session_id to verify its the same user
// 6:01
// and then all the routes made in dashboard routes would only be editable//deletable by the user who can see those posts in their own dashboard
// 6:03
// does that make sense?


// Janet Webster
//   6:03 PM
// OK. I'm going to have to dig into this further. For some reason I thought I could just hide the buttons on the blog post. :sweat_smile:
// :bust_in_silhouette:
// zcampanelli
// APP  6:04 PM
// yeah its a little bit more complcated than that im sorry :smiling_face_with_tear: but try. giving what i said a shot and if you run into ttrouble feel free to return for more help!
// 6:04
// Thank you for reaching out to us at AskBCS!
// At the end of our session you will get a link to a super quick survey on how you’d rate your assistance today. If you could do that for me it would mean a lot because knowing how we’re doing helps us to learn how to better assist you guys! :grin:
// Other than that good luck on your project and enjoy your day!

// imports
const router = require('express').Router();
const sequelize = require('../config/connection');
const { BlogPost, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    BlogPost.findAll({
        where: {
            user_id: req.session.user_id,
        },
        attributes: ["id", "title", "description", "date_created"],
        include: [
            {
                model: Comment,
                attributes: ["id", "comment_body", "date_created", "user_id", "blogPost_id"],
                include: {
                    model: User,
                    attributes: ["name"],
                },
            },
            {
                model: User,
                attributes: ["name"],
            },
        ],
    })
    .then((postData) => {
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('dashboard', { posts, loggedIn: true });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/edit/:id', withAuth, (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id,
        },
        attributes: ["id", "title", "description", "date_created"],
        include: [
            {
                model: User,
                attributes: ["name"],
            },
            {
                model: Comment,
                attributes: ["id", "comment_body", "date_created", "user_id", "blogPost_id"],
                include: {
                    model: User,
                    attributes: ["name"],
                },
            },
        ],
    })
    .then((postData) => {
        if (!postData) {
            res.status(404).json({ message: "Could not find posts with this ID"});
            return;
        }
        const post = postData.get({ plain: true });
        res.render('edit', { post, loggedIn: true });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/new', (req, res) => {
    res.render('new');
});

module.exports = router;