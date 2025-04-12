const Appointment=require("../models/Appointment");
const Notification=require("../models/Notification");
const Patient = require("../models/Patient");

exports.addAppointment=async(req,res)=>{
    const patientId=req.params.id;
    const doctor=req.user.id;
    const {date,purpose}=req.body;
    try{
        const appointment=new Appointment({
            doctor,
            patient:patientId,
            date,
            purpose
        })
        await appointment.save();
        const patient=await Patient.findById(patientId);
        const notification=new Notification({
            sender:doctor,
            receiver:patient.user,
            message:'New Appointment Scheduled By Your Doctor',
            link:'/patient/appointments',
        })
        await notification.save();
        res.json({message:"appointment scheduled",appointment})
    }catch(error)
    {
        console.log(error);
        res.json({message:error})
    }
}
exports.getAppointmentsForDoctor=async(req,res)=>{
    const userId=req.user.id;
    try{
        const appointments=await Appointment.find({doctor:userId}).populate({
            path:"patient",
            populate:{
                path:'user',
                select:'firstName lastName'
            }
        }).sort({date:1})
        res.json(appointments);
    }catch(error)
    {
        console.log(error);
        res.json({message:error.message})
    }
}
exports.getAppointmentsForPatient=async(req,res)=>{
    const patientId=req.params.id;
    try{
        const appointments=await Appointment.find({patient:patientId}).populate('patient', 'chronic_disease')
        res.json(appointments)
    }catch(error)
    {
        console.log(error);
        res.json({message:error.message})
    }
}
exports.updateAppointment=async(req,res)=>{
    const appId=req.params.id;
    const {date,purpose}=req.body;
    try{
        const appointment=await Appointment.findById(appId);
        if(!appointment)
            return res.json({message:"appointment not found"})
        appointment.date=date;
        appointment.purpose=purpose;
        const patient=await Patient.findById(appointment.patient);
        const notification=new Notification({
            sender:req.user.id,
            receiver:patient.user,
            message:'Appointment Updated By Your Doctor',
            link:'patient/appointments'
        })
        await notification.save();
        await appointment.save();
        res.json({message:"appointment updated",appointment})
    }catch(error)
    {
        console.log(error)
        res.json({message:error.message})
    }
}
exports.deleteAppointment=async(req,res)=>{
    const appId=req.params.id;
    try{
        const appointment=await Appointment.findByIdAndDelete(appId);
        if(!appointment)
            return res.json({message:"appointment not found"})
        res.json({message:"appointment deleted"})
    }catch(error)
    {
        console.log(error)
        res.json({message:error.message})
    }
}