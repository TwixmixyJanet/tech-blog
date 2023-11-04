// imports
const router = require('express').Router();
const userRoutes = require('./user-routes');
const blogPostRoutes = require('./blogpost-routes');
const commentRoutes = require('./comment-routes');

// middleware
router.use('/users', userRoutes);
router.use('/blogPost', blogPostRoutes);
router.use('/comment', commentRoutes);

// export
module.exports = router;