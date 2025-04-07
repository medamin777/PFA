const express=require("express");
const router=express.Router();
const patientcontroller=require("../controllers/PatientController");
const {authenticatejwt,authorizeDoctor}=require("../middleware/authMiddleware")
const upload=require("../utils/UploadsFile");

//create a new patient
router.post('/',authenticatejwt,upload.single('profilePicture'),patientcontroller.createPatient);

// get all patients for a specific doctor 
router.get('/',authenticatejwt,patientcontroller.getAllPatientsForDoctor);

router.get('/current',authenticatejwt,patientcontroller.getCurrentPatient);

router.post('/:id',authenticatejwt,patientcontroller.updatePatient);
//get patient ById
router.get('/:id',authenticatejwt,patientcontroller.getPatientForDcotor);


// delete a patient

router.delete('/:id',authenticatejwt,patientcontroller.deletePatient);

module.exports=router;