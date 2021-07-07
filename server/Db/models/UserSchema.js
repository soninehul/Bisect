const mongoose = require('../connection');
const bcrypt =require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    friends: { type: Array },
    expensis: { type: Array }
})

UserSchema.pre('save',async function(next){
    try{
        const salt =await bcrypt.genSalt(10);
        const hasedpass=await bcrypt.hash(this.password,salt);
        console.log(this.password);
        this.password=hasedpass;
        console.log(this.password);
        console.log("called before saving a user");
        next();
        
    }
    catch(error){
        next(error);
    }
})


const userModel = mongoose.model('user', UserSchema);

module.exports = userModel;
//user
// F3gu27cjwp5Hzt2m
//mongodb+srv://user:F3gu27cjwp5Hzt2m@cluster0.rsqbr.mongodb.net/user?retryWrites=true&w=majority