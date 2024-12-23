import express from 'express';
import { approveInvoice, createInvoice, deleteInvoice, editInvoice, getInvoices, searchInvoices } from '../controllers/invoices.controllers.js';

const router = express.Router();

router.get('/', getInvoices);
router.post('/', createInvoice);
router.patch('/:invoiceId', approveInvoice);
router.put('/:invoiceId', editInvoice);
router.delete('/:invoiceId', deleteInvoice);
router.get('/search', searchInvoices);

export default router;