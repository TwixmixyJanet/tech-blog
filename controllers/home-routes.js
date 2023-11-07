// IMPORTS
const router = require('express').Router();
const { BlogPost, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Get route to base URL
router.get('/', async (req, res) => {
    try {
        // Request to find all blog posts datas
        const blogPostData = await BlogPost.findAll({
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

        // Map over blog post datas
        const blogPosts = blogPostData.map((blogPost) => 
        blogPost.get({ plain: true }));

        // Render to the homepage.handlebars page
        res.render('homepage', {
            blogPosts,
            logged_in: req.session.logged_in,
        });
        // Error catching
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Route to an individual blog post by ID
router.get('/blogPost/:id', withAuth, async (req, res) => {
    try {
        // Find blog post by primary key ID
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

        // Render to blogPost.handlebars
        res.render('blogPost', {
            ...blogPost,
            logged_in: req.session.logged_in,
        });
        // Error catching, redirect to login
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
        res.redirect('/login');
    }
});

// Route to the dashboard, including helper of withAuth
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        // Find user by primary key
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { excluse: ["password"] },
            // Include their blog posts
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

        // Render dashboard.handlebars
        res.render('dashboard', {
            ...user,
            logged_in: true,
        });
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});

// Route to create new post
router.get('/create', async (req, res) => {
    try {
        // IF logged in, render create.handlebars
        if (req.session.logged_in) {
            res.render('create', {
                logged_in: req.session.logged_in,
                userId: req.session.user_id,
            });
            return;
        } else {
            // Otherwise redirect to login
            res.redirect('/login');
        }
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});

// Route to create by ID, to edit existing post
router.get('/create/:id', async (req, res) => {
    try {
        // Existing blog post, find by ID
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

        // Render edit.handlebars if logged in
        if (req.session.logged_in) {
            res.render('edit', {
                ...blogPost,
                logged_in: req.session.logged_in,
                userId: req.session.user_id,
            });
            return;
        } else {
            res.redirect('/login');
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Route to login
router.all('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }
    // login.handlebars
    res.render('login');
});

// EXPORT
module.exports = router;