const mongoose = require('../connection');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    friends: { type: Array },
    expensis: { type: Array }
})

const userModel = mongoose.model('user', UserSchema);

module.exports = userModel;
//user
// F3gu27cjwp5Hzt2m
//mongodb+srv://user:F3gu27cjwp5Hzt2m@cluster0.rsqbr.mongodb.net/user?retryWrites=true&w=majority