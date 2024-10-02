import Invoice from "../models/invoices.model.js";
import Customer from "../models/customers.model.js";


export const getInvoices = async (req, res, next) => {
  try {
    const invoices = await Invoice.find().populate('customerId');
    res.status(200).json(invoices);
  } catch (error) {
    next(error);
  }
};
