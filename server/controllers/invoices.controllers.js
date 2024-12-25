import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

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
      phoneNumber,
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
      !phoneNumber ||
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
    const invoice = await Invoice.findOne({ invoiceId });
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

    // Return success response with a message and approval status
    res.status(200).json({
      message: "Invoice approved successfully",
      isApproved: invoice.approved,
    });
  } catch (error) {
    next(error);
  }
};

// Endpoint to edit an invoice
export const editInvoice = async (req, res, next) => {
  try {
    const { invoiceId } = req.params;
    const updates = req.body;

    // validate the invoice is provided
    if (!invoiceId) {
      return res.status(400).json({ message: "Invoice ID is required." });
    }
    // find and update the invoice
    const updatedInvoice = await Invoice.findOneAndUpdate(
      { invoiceId },
      updates,
      { new: true, runValidators: true }
    );

    // if the invoice is not found
    if (!updatedInvoice) {
      return res.status(404).json({ message: "Invoice not found." });
    }

    // return the updated invoice
    res.status(200).json({
      message: "Invoice updated successfully.",
      updatedInvoice,
    });
  } catch (error) {
    next(error);
  }
};

// Endpoint to delete an invoice
export const deleteInvoice = async (req, res, next) => {
  try {
    const { invoiceId } = req.params;

    // Validate that invoiceId is provided
    if (!invoiceId) {
      return res.status(400).json({ message: "Invoice ID is required." });
    }

    // Find and delete the invoice by invoiceId
    const deletedInvoice = await Invoice.findOneAndDelete({ invoiceId });

    // If the invoice is not found, return a 404 error
    if (!deletedInvoice) {
      return res.status(404).json({ message: "Invoice not found." });
    }

    // Return a success response
    res.status(200).json({
      message: "Invoice deleted successfully.",
      deletedInvoice,
    });
  } catch (error) {
    next(error);
  }
};

// Updated searchInvoices Controller
export const searchInvoices = async (req, res, next) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: "Query is required." });
    }

    // Search invoices by invoiceId
    const byInvoiceId = await Invoice.find({ invoiceId: query }).populate(
      "customerId"
    );

    // Search invoices by customer fullName
    const byCustomerName = await Invoice.find({})
      .populate({
        path: "customerId",
        match: { fullName: { $regex: query, $options: "i" } }, // Case-insensitive match
      })
      .then((results) =>
        results.filter((invoice) => invoice.customerId !== null)
      ); // Remove unmatched

    // Combine the results and remove duplicates
    const combinedResults = [...byInvoiceId, ...byCustomerName];
    const uniqueResults = combinedResults.filter(
      (item, index, self) =>
        index ===
        self.findIndex((i) => i._id.toString() === item._id.toString())
    );

    if (uniqueResults.length === 0) {
      return res.status(404).json({ message: "No invoices found." });
    }

    res.status(200).json(uniqueResults);
  } catch (error) {
    next(error);
  }
};


// Convert import.meta.url to __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Endpoint to download a single invoice
export const downloadInvoicePdf = async (req, res, next) => {
  try {
    const { invoiceId } = req.params;

    // fetch invoice data from the db
    const invoice = await Invoice.findOne({ invoiceId }).populate("customerId");
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found." });
    }

    // Create a PDF invoice using pdfKit
    const doc = new PDFDocument();

    // Set up response headers to indicate PDF content
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=invoice-${invoiceId}.pdf`
    );

    // Pipe the document to the response (sends the PDF to the client)
    doc.pipe(res);

    try {
      // Add a logo image at the top center
      const logoPath = path.join(__dirname, '../../client/public/images/logos/Pharmanic_Logo.png');
      
      // Check if the file exists
      if (fs.existsSync(logoPath)) {
        const imageWidth = 150;
        const pageWidth = doc.page.width;
        const x = (pageWidth - imageWidth) / 2;
        const y = 30; // Adjust margin as needed
  
        doc.image(logoPath, x, y, {
          fit: [imageWidth, imageWidth],
          align: 'center',
          valign: 'top'
        });
      } else {
        console.error('Logo image not found at path:', logoPath);
        doc.text('Logo image not found', {
          align: 'center'
        });
      }
    } catch (error) {
      console.error('Error loading logo image:', error);
      doc.text('Error loading logo image', {
        align: 'center'
      });
    }

    // Add content to the PDF document
    doc.fontSize(20).text("Invoice", { align: "center" });
    doc.fontSize(12).moveDown(2);
    doc.text(`Invoice ID: ${invoice.invoiceId}`);
    doc.fontSize(12).moveDown(1);
    doc.text(`Date: ${invoice.date}`);
    doc.fontSize(12).moveDown(1);
    doc.text(`Customer: ${invoice.customerId.fullName}`);
    doc.fontSize(12).moveDown(1);
    doc.text(`Medication: ${invoice.medication}`);
    doc.fontSize(12).moveDown(1);
    doc.text(`Quantity: ${invoice.quantity}`);
    doc.fontSize(12).moveDown(1);
    doc.text(`Unit Price: $${invoice.unitPrice}`);
    doc.fontSize(12).moveDown(1);
    doc.text(`Total: $${invoice.totalPrice}`);
    doc.fontSize(12).moveDown(1);

    // Finalize the document (end the PDF)
    doc.end();
  } catch (error) {
    next(error);
  }
};
