const crypto = require('crypto')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { match } = require('assert')
const { inflateSync } = require('zlib')

const AdminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true,"Please provide a username"]
    },
    email:{
        type:String,
        required:[true, "Please provide a email"],
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email",
          ]
    },
    password:{
        type:String,
        required:[true, "Please add a password"],
        minlength: 8,
        select: false,
    },
    feedback:{
        type:String,
        required:false
    },
    marks:{
        type:String,
        required:false
    },
    student_ID:{
        type: String
    },
    
    resetPasswordToken: String,
    resetPasswordExpire: Date
})

AdminSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next();
})

AdminSchema.methods.matchPasswords = async function(password){
    return await bcrypt.compare(password, this.password)
}

AdminSchema.methods.getSignedToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    })
}

AdminSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");
  
    // Hash token (private key) and save to database
    this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
  
    // Set token expire date
    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000); // Ten Minutes
  
    return resetToken;
  };

const Admin = mongoose.model("Admin", AdminSchema)

module.exports = Admin