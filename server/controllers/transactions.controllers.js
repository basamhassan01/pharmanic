import Transaction from "../models/transactions.model.js";
import Customer from "../models/customers.model.js";

// get all transactions data
export const getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find().populate('customerId');
    res.status(200).json(transactions);
  } catch (error) {
    next(error);
}
};

// create a new transaction
export const createTransaction = async (req, res, next) => {
  try {
    const { transactionId, date, customerId, medication, quantity, totalPrice } = req.body;
    //validate the required fields
    if (!transactionId || !date || !customerId || !medication || !quantity || !totalPrice) {
      return res.status(400).json({ message: "All fields are required." });
    }
    // verify if the customer exists
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found." });
    }
    // create a new transaction
    const newTransaction = new Transaction({
      transactionId,
      date,
      customerId,
      medication,
      quantity,
      totalPrice,
    });
    const savedTransaction = await newTransaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    next(error);
  }
}