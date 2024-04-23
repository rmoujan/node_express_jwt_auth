const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes')
const app = express();
const cookieParser = require('cookie-parser');
// middleware :
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser()); // using the middleware to be able to parse cookies
// view engine 
app.set('view engine', 'ejs');

// database connection : 
const dbURI = 'mongodb+srv://Reshe:reshe123@cluster2.zdpa3n7.mongodb.net/auth_node';

mongoose.connect(dbURI)
        .then((result) => app.listen(3005))
        .catch((err) => console.log(err));

// routes :
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));

app.use(authRoutes);

// cookies :
app.get('/set-cookies', (req, res) => {
    // res.header('Set-Cookie', 'newUser=true');
    res.cookie('newUser', false);
    res.cookie('isEmployee', true, {maxAge: 1000 * 60 * 60 * 24, httpOnly: true});
    res.send('you got the cookies'); 
});

app.get('/read-cookies', (req, res) => {
    const cookies = req.cookies;
    console.log(cookies); // 
    res.json(cookies); // send back the cookies to the browser.
})