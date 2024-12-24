import express from 'express';
import { approveInvoice, createInvoice, deleteInvoice, downloadInvoicePdf, editInvoice, getInvoices, searchInvoices } from '../controllers/invoices.controllers.js';

const router = express.Router();

router.get('/', getInvoices);
router.post('/', createInvoice);
router.patch('/:invoiceId', approveInvoice);
router.put('/:invoiceId', editInvoice);
router.delete('/:invoiceId', deleteInvoice);
router.get('/search', searchInvoices);

// New route for downloading the invoice as a PDF
router.get('/:invoiceId/download', downloadInvoicePdf);

export default router;