// USER AUTHENTIFICATION
const withAuth = (req, res, next) => {
    console.log(req.session.logged_in);

    if (!req.session.logged_in) {
        res.redirect('/login');
    } else {
        next();
    }
};

// EXPORTS
module.exports = withAuth;