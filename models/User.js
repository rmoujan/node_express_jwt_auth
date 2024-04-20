const mongoose = require('mongoose');
const {isEmail} = require('validator');
const userSchema = new mongoose.Schema({
    email: {
        type:String,
        required: [true,'Please enter an email'],
        unique: true,
        lowercase: true,
        validate:  [isEmail, 'PLease enter a valid email']
    },
    password: {
        type:String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters']
    },
});
// this model user it will be automatically connected to the collection users on database 
const User = mongoose.model('user', userSchema);
// =>  so when want to save a user or get a user we gonna use this model 'User'
module.exports = User;