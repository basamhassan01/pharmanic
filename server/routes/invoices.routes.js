import express from 'express';
import { createInvoice, getInvoices } from '../controllers/invoices.controllers.js';

const router = express.Router();

router.get('/', getInvoices);
router.post('/', createInvoice);

export default router;