import express from 'express';
import { getInvoices } from '../controllers/invoices.controllers.js';

const router = express.Router();

router.get('/', getInvoices);

export default router;