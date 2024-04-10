const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://dummyuser:gwtfdRzjM0ICP9d0@cluster0.ccwhhzl.mongodb.net/paytm")

const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: true,
        minlength: 3,
        maxlength: 30,
        trim: true,
        unique: true,
        lowercase: true
    },
    firstname: {
        type: String,
        required: true,
        maxlength: 30,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        maxlength: 30,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
});

const accountSchema = new mongoose.Schema({
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }, 
    balance: {
        type: Number,
        required: true
    }
});

const Account = new mongoose.model("Account", accountSchema)
const User = new mongoose.model("User", userSchema)

module.exports = {
    User,
    Account
};