import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
// import Customer from "./models/customers.model.js";
// import Invoice from "./models/invoices.model.js";
// import Transaction from "./models/transactions.model.js";
// import { customers, invoices, transactions } from "./data/index.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

/* ADD DATA ONE TIME AND THEN COMMENT THE TWO LINES BELOW*/
// Transaction.insertMany(transactions);
// Customer.insertMany(customers);
// Invoice.insertMany(invoices);
