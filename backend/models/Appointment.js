const mongoose=require("mongoose");

const appointmentSchema=new mongoose.Schema({
    doctor:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    patient:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    date:{
        type:Date,
        unique:true,
        required:true
    },
    purpose:{
        type:String,
        required:true
    }
})
module.exports=mongoose.model("Appointment",appointmentSchema)
