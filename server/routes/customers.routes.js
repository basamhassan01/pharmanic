import express from 'express';
import { createCustomer, deleteCustomer, getCustomers, updateCustomer } from '../controllers/customers.controllers.js';

const router = express.Router();

router.get('/', getCustomers);
router.post('/', createCustomer);
router.put('/:customerId', updateCustomer); 
router.delete('/:customerId', deleteCustomer);

export default router;