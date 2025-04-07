const express = require("express");
const router = express.Router();
const prescriptionController = require("../controllers/PrescriptionController");
const { authenticatejwt, authorizeDoctor } = require("../middleware/authMiddleware");

// Route to create a new prescription
router.post("/:id", authenticatejwt, authorizeDoctor, prescriptionController.createPrescription);

// Route to get all prescriptions for a specific patient
router.get("/:id", authenticatejwt, prescriptionController.getPrescriptionForPatient); // Corrected to use patient ID

//Route for patient to get their own prescriptions

router.get("/",authenticatejwt,prescriptionController.getPrescriptionForPatient);




//Route to delete a prescription by id 

router.delete("/:id",authenticatejwt,authorizeDoctor,prescriptionController.deletePrescription)
module.exports = router;