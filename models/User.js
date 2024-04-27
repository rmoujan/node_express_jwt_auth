const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');
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

// fire a function before doc saved to db:
// that's called hook
userSchema.pre('save', async function(next) { 
    // this refers to the local instance of the user before we saved to db
    console.log('user about to be created & saved', this);
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// fire a function after doc saved to db:
// that's called hook
userSchema.post('save',  function(doc, next) {
    // doc refers to the saved user in db 
    console.log('NEW USER WAS CREATED & SAVED', doc);
    
    next();
});


// static method to login user :
userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if (user)
    {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('Incorrect password');

    }
    throw Error('Incorrect email');
}

// this model user it will be automatically connected to the collection users on database 
const User = mongoose.model('user', userSchema);
// =>  so when want to save a user or get a user we gonna use this model 'User'
module.exports = User;
