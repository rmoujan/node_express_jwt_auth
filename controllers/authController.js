const User = require('../models/User');
const jwt = require('jsonwebtoken');
// handle errors :
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors =  {email: '', password: ''};
    // duplicate error code :
    if (err.code === 11000)
    {
        errors.email = 'that email is already registered';
        return errors;
    }
    // validation errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
}
const maxAge = 3 * 24 * 60 * 60; // 3 days in secondes .
// this jwttoken will be valid for 3 days.
// this function create a token by id will the body and header will be added automatically.
const createToken = (id) => {
    return jwt.sign({ id }, 'reshe secret', {
        expiresIn:maxAge,
    });
}

module.exports.signup_get = (req, res) => {
    res.render('signup');
}

module.exports.login_get = (req, res) => {
    res.render('login');
}

module.exports.signup_post = async (req, res) => {
    const { email, password } = req.body;
    console.log('From the server side ************ ',email, password);
    try {
        const newUser = await User.create({ email, password });
        const token = createToken(newUser._id);
        // adding the jwtToken in the cookie:
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge*1000}); 
        // {httpOnly: true} ==> this option disable to access the cookie in the frontend. 
        res.status(201).json({user:newUser._id});  
    }
    catch(err)
    {
        // console.log(err);
        const errors = handleErrors(err);
        res.status(400).json({errors});

         
    }

    // res.send('new signup');
}

module.exports.login_post = (req, res) => {
    res.send('user login');
}


// weslt hena Node Auth Tutorial (JWT) #6 - Mongoose Hooks