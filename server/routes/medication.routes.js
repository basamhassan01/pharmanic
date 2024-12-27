import express from 'express';
import { createMedication, deleteMedication, getMedications } from '../controllers/medication.controllers.js';

const router = express.Router();

// Route to get all medications
router.get('/', getMedications);
router.post('/', createMedication);
router.delete('/:id', deleteMedication);


export default router;