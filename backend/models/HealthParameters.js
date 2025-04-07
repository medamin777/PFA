const mongoose=require("mongoose");
const HealthParameterSchema=new mongoose.Schema({
    patient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Patient",
        required:true
    },
    timestamp:{
        type:Date,
        default:Date.now
    },
    heart_rate:{
        type:Number,
    },
    blood_pressure:{
        type:String,
        required:true,
    },
    temperature:{
        type:Number,
        
    },
    oxygen_level:{
        type:Number,
        
    },
    glucose_level:{
        type:Number,
        required:true,
    },
    notes:{
        type:String
    }
})
module.exports=mongoose.model("HealthParameter",HealthParameterSchema);
