import { useState, useEffect } from "react";
import axios from "axios";

function InvoiceModal({ isOpen, onClose, onInvoiceCreated }) {
  const [invoiceId, setInvoiceId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerId, setCustomerId] = useState(""); // Add customerId state
  const [medication, setMedication] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [date, setDate] = useState("");
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [medications, setMedications] = useState([]); // Add medications state

  useEffect(() => {
    if (isOpen) {
      setInvoiceId(generateInvoiceId());
      fetchCustomers();
      fetchMedications();
    }
  }, [isOpen]);

  const generateInvoiceId = () => {
    const randomNumber = Math.floor(100 + Math.random() * 900); // Generates a number between 100 and 999
    return `T${randomNumber}`;
  };

  const fetchCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/customers");
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const fetchMedications = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/medications");
      setMedications(response.data);
    } catch (error) {
      console.error("Error fetching medications:", error);
    }
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    setPhoneNumber(value);
    if (value) {
      const filtered = customers.filter((customer) =>
        customer.phoneNumber.includes(value)
      );
      setFilteredCustomers(filtered);
      if (filtered.length === 0) {
        setCustomerName(""); // Clear customer name if no match is found
      }
    } else {
      setFilteredCustomers([]);
      setCustomerName(""); // Clear customer name if input is empty
    }
  };

  const handleCustomerSelect = (customer) => {
    setPhoneNumber(customer.phoneNumber);
    setCustomerName(customer.fullName);
    setCustomerId(customer._id); // Set the customer ID
    setFilteredCustomers([]);
  };

  const handleMedicationChange = (e) => {
    const selectedMedicationName = e.target.value;
    setMedication(selectedMedicationName);
    const selectedMedication = medications.find(
      (med) => med.name === selectedMedicationName
    );
    if (selectedMedication) {
      setUnitPrice(selectedMedication.price);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const totalPrice = quantity * unitPrice; // Calculate total price

    let customerIdToUse = customerId;

    // Check if the customer exists based on the phone number
    if (!customerIdToUse) {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/customers?phoneNumber=${phoneNumber}`
        );
        const existingCustomer = response.data;

        if (existingCustomer) {
          customerIdToUse = existingCustomer._id;
        } else {
          // Create a new customer if not found
          const newCustomerResponse = await axios.post(
            "http://localhost:3001/api/customers",
            {
              fullName: customerName,
              phoneNumber,
            }
          );
          customerIdToUse = newCustomerResponse.data._id;
        }
      } catch (error) {
        console.error("Error checking or creating customer:", error);
        return;
      }
    }

    const invoiceData = {
      invoiceId,
      date,
      customerId: customerIdToUse,
      medication,
      phoneNumber,
      quantity,
      unitPrice,
      totalPrice,
    };

    console.log("Submitting invoice data:", invoiceData); // Log the invoice data

    try {
      const response = await axios.post("http://localhost:3001/api/invoices", invoiceData);
      // Reset form values
      setInvoiceId("");
      setPhoneNumber("");
      setCustomerName("");
      setCustomerId(""); // Reset customer ID
      setMedication("");
      setQuantity("");
      setUnitPrice("");
      setDate("");
      onClose(); // Close the modal after submission
      // Show success alert
      alert("Invoice created successfully");
      // Call the callback function to update the parent component
      onInvoiceCreated(response.data);
    } catch (error) {
      console.error("Error submitting invoice:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded shadow-md w-1/3">
        <h2 className="text-lg font-bold mb-4">New Invoice</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block">Invoice ID</label>
            <input
              type="text"
              name="invoiceId"
              value={invoiceId}
              readOnly
              className="border border-[#0B81C7] border-opacity-20 rounded w-full py-2 px-3"
            />
          </div>
          <div className="mb-4 relative">
            <label className="block">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              className="border border-[#0B81C7] border-opacity-20 rounded w-full py-2 px-3"
            />
            {filteredCustomers.length > 0 && (
              <ul className="absolute bg-white border border-gray-300 w-full mt-1 max-h-40 overflow-y-auto z-10">
                {filteredCustomers.map((customer) => (
                  <li
                    key={customer._id}
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => handleCustomerSelect(customer)}
                  >
                    {customer.phoneNumber}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="mb-4">
            <label className="block">Customer Name</label>
            <input
              type="text"
              name="customerName"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="border border-[#0B81C7] border-opacity-20 rounded w-full py-2 px-3"
            />
          </div>
          <div className="mb-4 relative">
            <label className="block">Medication</label>
            <select
              name="medication"
              value={medication}
              onChange={handleMedicationChange}
              className="border border-[#0B81C7] border-opacity-20 rounded w-full py-2 px-3"
            >
              <option value="">Select Medication</option>
              {medications.map((med) => (
                <option key={med._id} value={med.name}>
                  {med.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="border border-[#0B81C7] border-opacity-20 rounded w-full py-2 px-3"
            />
          </div>
          <div className="mb-4">
            <label className="block">Unit Price</label>
            <input
              type="number"
              name="unitPrice"
              value={unitPrice}
              onChange={(e) => setUnitPrice(e.target.value)}
              className="border border-[#0B81C7] border-opacity-20 rounded w-full py-2 px-3"
            />
          </div>
          <div className="mb-4">
            <label className="block">Date</label>
            <input
              type="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border border-[#0B81C7] border-opacity-20 rounded w-full py-2 px-3"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InvoiceModal;