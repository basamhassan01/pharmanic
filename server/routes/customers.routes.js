import express from 'express';
import { getCustomers } from '../controllers/customers.controllers.js';

const router = express.Router();

router.get('/', getCustomers);

export default router;