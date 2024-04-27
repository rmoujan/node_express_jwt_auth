const jwt = require('jsonwebtoken');
const User = require('../models/User');

// inside any middleware we get access to req and res objects.
const requireAuth = (req, res, next) => {

    const token = req.cookies.jwt;
    // check json web token exists and is verified.
    if (token)
    {
         jwt.verify(token, 'reshe secret' , (err, decodedToken) => {
              if (err) {
                console.log(err.message);
                res.redirect('/login');
              } else {
                console.log(decodedToken);
                next();
              }
         });
    }
    else {
        res.redirect('/login');
    }
}
// CEHCK CURRENT USER :
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token)
    {
         jwt.verify(token, 'reshe secret' , async (err, decodedToken) => {
              if (err) {
                console.log(err.message);
                res.locals.user = null;
                next();
              } else {
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                res.locals.user = user; 
                // ==>  to make this variable user accessible via views.
                next();
              }
         });
    }
    else {
        res.locals.user = null;
        next();
    }

}
module.exports = {requireAuth, checkUser};

