import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import transactionRoutes from './routes/transactions.routes.js';
import invoiceRoutes from './routes/invoices.routes.js';
import customerRoutes from './routes/customers.routes.js';
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

app.use('/api/transactions', transactionRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/customers', customerRoutes);

// MIDDLEWARE
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ 
    success: false,
    statusCode,
    message,
   });
})

/* ADD DATA ONE TIME AND THEN COMMENT THE TWO LINES BELOW*/
// Transaction.insertMany(transactions);
// Customer.insertMany(customers);
// Invoice.insertMany(invoices);
