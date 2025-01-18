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
    const { fullName, age, email, phoneNumber } = req.body;
    //validate the required fields
    if (!fullName || !age || !email || !phoneNumber) {
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
      phoneNumber,
    });
    const savedCustomer = await newCustomer.save();
    res.status(201).json(savedCustomer);

  } catch (error) {
    next(error);
  }
}

// PUT endpoint to update a customer
export const updateCustomer = async (req, res, next) => {
  try {
    const { customerId } = req.params;
    const { fullName, age, email } = req.body;

    // Validate that customerId is provided
    if (!customerId) {
      return res.status(400).json({ message: "Customer ID is required." });
    }

    // Check if the customer exists
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found." });
    }

    // Update customer details if provided
    if (fullName) customer.fullName = fullName;
    if (age) customer.age = age;
    if (email) customer.email = email;

    // Save the updated customer
    const updatedCustomer = await customer.save();

    // Return the updated customer
    res.status(200).json(updatedCustomer);

  } catch (error) {
    next(error);
  }
};

// Endpoint to delete a customer
export const deleteCustomer = async (req, res, next) => {
  try {
    const { customerId } = req.params;

    // Validate that customerId is provided
    if (!customerId) {
      return res.status(400).json({ message: "Customer ID is required." });
    }

    // Find and delete the customer by customerId
    const deletedCustomer = await Customer.findByIdAndDelete(customerId);

    // If the customer is not found, return a 404 error
    if (!deletedCustomer) {
      return res.status(404).json({ message: "Customer not found." });
    }

    // Return a success response
    res.status(200).json({
      message: "Customer deleted successfully.",
      deletedCustomer,
    });
  } catch (error) {
    next(error);
  }
};
