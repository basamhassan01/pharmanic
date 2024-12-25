import express from 'express';
import { getMedications } from '../controllers/medication.controllers.js';

const router = express.Router();

// Route to get all medications
router.get('/', getMedications);

export default router;