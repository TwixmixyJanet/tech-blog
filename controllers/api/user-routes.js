// IMPORTS
const router = require('express').Router();
const { User } = require('../../models');

// Post route to base URL
router.post('/', async (req, res) => {
    try {
        // Create a new user
        const userData = await User.create(req.body);

        // Save down new user data
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.status(200).json(userData);
        });
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

// Post route to login URL
router.post('/login', async (req, res) => {
    try {
        // Find the matching user to the login credentials
        const userData = await User.findOne({ where: { email: req.body.email } });

        // If not userData then return error
        if (!userData) {
            console.log("Could not find that user");
            res.status(400).json({ message: "Incorrect email. Please try again."});
            return;
        };

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            console.log("That password did not match");
            res.status(400).json({ message: "Incorrect password. Please try again."});
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.json({ user: userData, message: "You have successfully logged in" });
        });
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

// Post route to logout URL
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        // End session
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

// EXPORT
module.exports = router;