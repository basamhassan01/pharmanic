import express from 'express';
import { createCustomer, deleteCustomer, getCustomers } from '../controllers/customers.controllers.js';

const router = express.Router();

router.get('/', getCustomers);
router.post('/', createCustomer);
router.delete('/:customerId', deleteCustomer);

export default router;