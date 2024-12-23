import express from 'express';
import { createTransaction, deleteTransaction, editTransaction, getTransactions, searchTransactions } from '../controllers/transactions.controllers.js';

const router = express.Router();

router.get('/', getTransactions);
router.post('/', createTransaction);
router.put("/:transactionId", editTransaction);
router.delete("/:transactionId", deleteTransaction);
router.get('/search', searchTransactions);

export default router;