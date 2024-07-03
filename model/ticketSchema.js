const { required } = require("joi");
const mongoose = require("mongoose");
const Schema=mongoose.Schema;

const TicketSchema = new Schema({
    clientId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    clientEmail:{
        type:String,
        required:true,
    },
    issue:{
        type:String,
        required:true,
        maxlength:150,
    },
    status:{
        type:String,
        required:true,
        default:"Response Pending",
    },
    openAt:{
        type:Date,
        required:true,
        default:Date.now(),
    },
    desc:{
        type:String,
        required:true,

    },
    feedback:{
        type:String,
        maxlength:1000,
    },
    messagehistory:[
        {
            sentby:{
                type:String,
                required:true,
            },
            messagebody:{
                type:String,
                maxlength:1000,
                required:true,
            },        
            messagedate:{
                type:Date,
                required:true,
                default:Date.now(),
            },
        },
    ],
});

module.exports= mongoose.model("Ticket",TicketSchema);