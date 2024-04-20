const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes')
const app = express();

// middleware :
app.use(express.static('public'));
app.use(express.json());
// view engine 
app.set('view engine', 'ejs');

// database connection : 
const dbURI = 'mongodb+srv://Reshe:reshe123@cluster2.zdpa3n7.mongodb.net/auth_node';

mongoose.connect(dbURI)
        .then((result) => app.listen(3004))
        .catch((err) => console.log(err));

// routes :
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));

app.use(authRoutes);  