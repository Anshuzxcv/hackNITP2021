const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    phone:{
        type:Number,
        unique:true,
        required:[true,'account without mobile number is not valid']
    },
    password:{
        type:String
    },
    status:{
        type:String,
        default:'not registered'
    }
});

userSchema.pre('save', async function(next) {
    try{
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(this.password, salt);
    console.log('this.password:', this.password);
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    }
    catch(err){
        console.log(err);
    }
    // next();
});

userSchema.methods.isValidPass = async function(password) {
    try{
        return await bcrypt.compare(password, this.password);
    }
    catch(err){
        throw err;
    }
}

const newuser = mongoose.model('users',userSchema);

module.exports = newuser;