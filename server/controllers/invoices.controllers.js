import Invoice from "../models/invoices.model.js";
import Customer from "../models/customers.model.js";
import Transaction from "../models/transactions.model.js";

// Endpoint to get all invoices
export const getInvoices = async (req, res, next) => {
  try {
    const invoices = await Invoice.find().populate("customerId");
    res.status(200).json(invoices);
  } catch (error) {
    next(error);
  }
};

// Endpoint to create a new invoice
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


// Endpoint to approve an invoice
export const approveInvoice = async (req, res, next) => {
  try {
    const { invoiceId } = req.params;
    const invoice = await Invoice.findById(invoiceId);
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found." });
    }
    if (invoice.approved) {
      return res.status(400).json({ message: "Invoice already approved." });
    }
    // create a transaction from the invoice
    const newTransaction = new Transaction({
      transactionId: invoice.invoiceId,
      date: invoice.date,
      customerId: invoice.customerId,
      medication: invoice.medication,
      quantity: invoice.quantity,
      totalPrice: invoice.totalPrice,
    });

    await newTransaction.save();
    // approve the invoice
    invoice.approved = true;
    await invoice.save();
    res.status(200).json(invoice);
}
catch{
  next(error);
}
} 
