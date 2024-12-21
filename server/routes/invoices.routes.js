import express from 'express';
import { approveInvoice, createInvoice, getInvoices } from '../controllers/invoices.controllers.js';

const router = express.Router();

router.get('/', getInvoices);
router.post('/', createInvoice);
router.patch('/:invoiceId', approveInvoice);

export default router;