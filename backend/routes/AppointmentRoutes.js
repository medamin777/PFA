const express=require("express");
const {authenticatejwt}=require("../middleware/authMiddleware");
const router=express.Router();
const appointmentController=require("../controllers/AppointmentController");


//get appointment for doctor
router.get("/doctor",authenticatejwt,appointmentController.getAppointmentsForDoctor)

//get appointment for patient
router.get("/patient/:id",authenticatejwt,appointmentController.getAppointmentsForPatient)

//route to add appointment by patient id 
router.post("/:id",authenticatejwt,appointmentController.addAppointment);

// update appointment by its id
router.put("/:id",authenticatejwt,appointmentController.updateAppointment);

//delete appointment by its id 
router.delete("/:id",authenticatejwt,appointmentController.deleteAppointment);

module.exports=router;
