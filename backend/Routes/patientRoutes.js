const express = require('express');
const router = express.Router();
const {
    createPatient,
    getPatients,
    getPatientById,
    updatePatient,
    deletePatient
} = require('../Controllers/patientController');

router.post('/', createPatient);
router.get('/', getPatients);
router.get('/:id', getPatientById);
router.put('/:id', updatePatient);
router.delete('/:id', deletePatient);

module.exports = router;
