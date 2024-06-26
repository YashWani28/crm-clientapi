const mongoose = require("mongoose");
const Schema = mongoose.Schema

const userSchema = new Schema({
    name:{type:String},
    company:{type:String},
    address:{type:String},
    phone:{type:String,maxLength:10,required:true,unique:true},
    email:{type:String,unique:true},
    password:{type:String},
    
})

module.exports = mongoose.model("User",userSchema);