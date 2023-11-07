// IMPORTS
const router = require('express').Router();
const userRoutes = require('./user-routes');
const blogPostRoutes = require('./blogpost-routes');
const commentRoutes = require('./comment-routes');

// MIDDLEWARE
router.use('/users', userRoutes);
router.use('/blogPost', blogPostRoutes);
router.use('/comment', commentRoutes);

// EXPORT
module.exports = router;