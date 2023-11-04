// imports
const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');

// middleware
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

// exports
module.exports = router;