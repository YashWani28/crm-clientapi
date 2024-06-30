const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resetPinSchema = new Schema({
    pin:{
        type:Number,
        maxlength:6,
        minlength:6,
    },
    email:{
        type:String,
        maxlength:50,
        required:true,
    },
    // add date as well
    addedAt:{
        type:Date,
        required:true,
        default: Date.now(),

    }
});

module.exports = mongoose.model("resetPin",resetPinSchema);