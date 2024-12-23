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


// Endpoint to edit an existing transaction
export const editTransaction = async (req, res, next) => {
  try {
    const { transactionId } = req.params;
    const updateData = req.body;

    // Validate transactionId in the request
    if (!transactionId) {
      return res.status(400).json({ message: "Transaction ID is required." });
    }

    // Find the transaction and update it
    const updatedTransaction = await Transaction.findOneAndUpdate(
      { transactionId },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedTransaction) {
      return res.status(404).json({ message: "Transaction not found." });
    }

    res.status(200).json({
      message: "Transaction updated successfully.",
      updatedTransaction,
    });
  } catch (error) {
    next(error);
  }
};



// Endpoint to delete a transaction
export const deleteTransaction = async (req, res, next) => {
  try {
    const { transactionId } = req.params;

    // Validate that transactionId is provided
    if (!transactionId) {
      return res.status(400).json({ message: "Transaction ID is required." });
    }

    // Find and delete the transaction by transactionId
    const deletedTransaction = await Transaction.findOneAndDelete({ transactionId });

    // If the transaction is not found, return a 404 error
    if (!deletedTransaction) {
      return res.status(404).json({ message: "Transaction not found." });
    }

    // Return a success response
    res.status(200).json({
      message: "Transaction deleted successfully.",
      deletedTransaction,
    });
  } catch (error) {
    next(error);
  }
};


// Search transactions by transactionId or customer name
export const searchTransactions = async (req, res, next) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Query is required." });
    }

    // Search transactions by transactionId
    const byTransactionId = await Transaction.find({ transactionId: query }).populate("customerId");

    // Search transactions by customer name
    const byCustomerName = await Transaction.find({})
      .populate({
        path: "customerId",
        match: { fullName: { $regex: query, $options: "i" } }, // Case-insensitive match
      })
      .then((results) => results.filter((transaction) => transaction.customerId !== null)); // Remove unmatched

    // Combine the results and remove duplicates
    const combinedResults = [...byTransactionId, ...byCustomerName];
    const uniqueResults = combinedResults.filter(
      (item, index, self) =>
        index === self.findIndex((i) => i._id.toString() === item._id.toString())
    );

    if (uniqueResults.length === 0) {
      return res.status(404).json({ message: "No transactions found." });
    }

    res.status(200).json(uniqueResults);
  } catch (error) {
    next(error);
  }
};