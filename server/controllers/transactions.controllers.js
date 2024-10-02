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
