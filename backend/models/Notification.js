const mongoose=require("mongoose");
const User = require("./User");
const notificationSchema=new mongoose.Schema({

    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        
        required:true
    },
    message:
    {
        type:String,
        required:true
    },
    date:
    {
        type:Date,
        default:Date.now
    },
    read:
    {
        type:Boolean,
        default:false
    },
    link:
    {
        type:String,
    }
});
module.exports=mongoose.model("Notification",notificationSchema);