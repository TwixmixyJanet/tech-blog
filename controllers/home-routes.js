// imports
const router = require('express').Router();
const { BlogPost, User, Comment } = require('../models');

router.get('/', async (req, res) => {
    try {
        constPostData = await BlogPost.findAll({
            include: [
                {
                    model: User,
                    attributes: ["name"],
                },
                {
                    model: Comment,
                    attributes: ["comment_body"],
                },
            ],
        });

        const blogPosts = blogPostData.map((blogPost) => 
        blogPost.get({ plain: true }));

        res.render('homepage', {
            blogPosts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/blogPost/:id', withAuth, async (req, res) => {
    try {
        const blogPostData = await BlogPost.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ["name"],
                },
                {
                    model: Comment,
                    include: [User],
                },
            ],
        });

        const blogPost = blogPostData.get({ plain: true });
        console.log(blogPost);

        res.render('blogPost', {
            ...blogPost,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
        res.redirect('/login');
    }
});

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { excluse: ["password"] },
            include: [
                {
                    model: BlogPost,
                    include: [User],
                },
                {
                    model: Comment,
                },
            ],
        });

        const user = userData.get({ plain: true });
        console.log(user)

        res.render('dashboard', {
            ...user,
            logged_in: true,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});