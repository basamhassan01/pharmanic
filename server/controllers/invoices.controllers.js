import Invoice from "../models/invoices.model.js";
import Customer from "../models/customers.model.js";

export const getInvoices = async (req, res, next) => {
  try {
    const invoices = await Invoice.find().populate("customerId");
    res.status(200).json(invoices);
  } catch (error) {
    next(error);
  }
};

export const createInvoice = async (req, res, next) => {
  try {
    const {
      invoiceId,
      date,
      customerId,
      medication,
      quantity,
      unitPrice,
      totalPrice,
    } = req.body;
    //validate the required fields
    if (
      !invoiceId ||
      !date ||
      !customerId ||
      !medication ||
      !quantity ||
      !unitPrice ||
      !totalPrice
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if the customer exists
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found." });
    }

    // Create a new invoice
    const newInvoice = new Invoice({
      invoiceId,
      date,
      customerId,
      medication,
      quantity,
      unitPrice,
      totalPrice,
    });
    const savedInvoice = await newInvoice.save();
    res.status(201).json(savedInvoice);

  } catch (error) {
    next(error);
  }
};
