// // imports
// const router = require('express').Router();
// const sequelize = require('../config/connection');
// const { BlogPost, User, Comment } = require('../models');
// const withAuth = require('../utils/auth');

// router.get('/', withAuth, (req, res) => {
//     BlogPost.findAll({
//         where: {
//             user_id: req.session.user_id,
//         },
//         attributes: ["id", "title", "description", "date_created"],
//         include: [
//             {
//                 model: Comment,
//                 attributes: ["id", "comment_body", "date_created", "user_id", "blogPost_id"],
//                 include: {
//                     model: User,
//                     attributes: ["name"],
//                 },
//             },
//             {
//                 model: User,
//                 attributes: ["name"],
//             },
//         ],
//     })
//     .then((postData) => {
//         const posts = postData.map((post) => post.get({ plain: true }));
//         res.render('dashboard', { posts, loggedIn: true });
//     })
//     .catch((err) => {
//         console.log(err);
//         res.status(500).json(err);
//     });
// });

// router.get('/edit/:id', withAuth, (req, res) => {
//     Post.findOne({
//         where: {
//             id: req.params.id,
//         },
//         attributes: ["id", "title", "description", "date_created"],
//         include: [
//             {
//                 model: User,
//                 attributes: ["name"],
//             },
//             {
//                 model: Comment,
//                 attributes: ["id", "comment_body", "date_created", "user_id", "blogPost_id"],
//                 include: {
//                     model: User,
//                     attributes: ["name"],
//                 },
//             },
//         ],
//     })
//     .then((postData) => {
//         if (!postData) {
//             res.status(404).json({ message: "Could not find posts with this ID"});
//             return;
//         }
//         const post = postData.get({ plain: true });
//         res.render('edit', { post, loggedIn: true });
//     })
//     .catch((err) => {
//         console.log(err);
//         res.status(500).json(err);
//     });
// });

// router.get('/new', (req, res) => {
//     res.render('new');
// });

// module.exports = router;