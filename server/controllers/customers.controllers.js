import Customer from '../models/customers.model.js';

export const getCustomers = async (req, res, next) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    next(error);
  }
};

// create a new customer
export const createCustomer = async (req, res, next) => {
  try {
    const { fullName, age, email } = req.body;
    //validate the required fields
    if (!fullName || !age || !email) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if the customer exists
    const customer = await Customer.findOne({ email });
    if (customer) {
      return res.status(400).json({ message: "Customer already exists." });
    }

    // Create a new customer
    const newCustomer = new Customer({
      fullName,
      age,
      email,
    });
    const savedCustomer = await newCustomer.save();
    res.status(201).json(savedCustomer);

  } catch (error) {
    next(error);
  }
}