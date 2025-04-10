const Appointment=require("../models/Appointment");
const Notification=require("../models/Notification")
exports.addAppointment=async(req,res)=>{
    const patient=req.params.id;
    const doctor=req.user.id;

    const {date,purpose}=req.body;
    try{
        const appointment=new Appointment({
            doctor,
            patient,
            date,
            purpose
        })
        await appointment.save();
        const notification=new Notification({
            sender:doctor,
            receiver:patient,
            message:'New Appointment Scheduled By Your Doctor',
            link:'/patient/appointments',
        })
        await notification.save();
        res.json({message:"appointment scheduled ",appointment})
    }catch(error)
    {
        console.log(error);
        res.json({message:error})
    }

}
exports.getAppointmentsForDoctor=async(req,res)=>{
    const userId=req.user.id;
    try{
        const appointments=await Appointment.find({doctor:userId})
        res.json(appointments);
    }catch(error)
    {
        console.log(error);
        res.json({message:error.message})
    }
}
exports.getAppointmentsForPatient=async(req,res)=>{
    const patient=req.body.id;
    try{
        const appointments=await Appointment.find({patient:patient});
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
        const notification=new Notification({
            sender:appointment.doctor,
            receiver:appointment.patient,
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