import { useState, useEffect } from 'react';
import axios from 'axios'

function TransactionModal({ isOpen, onClose, transactionToEdit }) {
  const [transactionId, setTransactionId] = useState('');
  const [date, setDate] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [medication, setMedication] = useState('');
  const [quantity, setQuantity] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (transactionToEdit) {
      setIsEditing(true);
      setDate(transactionToEdit.date);
      setCustomerId(transactionToEdit.customerId);
      setMedication(transactionToEdit.medication);
      setQuantity(transactionToEdit.quantity);
      setTotalPrice(transactionToEdit.totalPrice);
    } else {
      setIsEditing(false);
      setDate('');
      setCustomerId('');
      setMedication('');
      setQuantity('');
      setTotalPrice('');
    }
  }, [transactionToEdit]);

  useEffect(() => {
    if (isOpen) {
      setTransactionId(generateTransactionId());
    }
  }, [isOpen]);

  const generateTransactionId = () => {
    const randomNumber = Math.floor(100 + Math.random() * 900); // Generates a number between 100 and 999
    return `T${randomNumber}`;
  };

  // Handle form submission (create or update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form fields
    if (!transactionId || !date || !customerId || !medication || !quantity || !totalPrice) {
      setErrorMessage('All fields are required.');
      return;
    }

    setIsLoading(true);
    try {
      let response;
      if (isEditing) {
        // For Updating Existing Customer Details
        const response = await axios.put(`http://localhost:3001/api/transactions/${transactionToEdit.transactionId}`, {
          transactionId,
          date,
          customerId,
          medication,
          quantity,
          totalPrice,
        });

        if (response.status === 200) {
          onClose();
          window.location.reload(); 
        }
      } else {
        // For Creating New Customer Details
        const response = await axios.post('http://localhost:3001/api/transactions', {
          transactionId,
          date,
          customerId,
          medication,
          quantity,
          totalPrice,
        });

        if (response.status === 201) {
          onClose();
          window.location.reload(); 
        }
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Error saving transaction');
    } finally {
      setIsLoading(false);
    }  
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded shadow-md w-1/3">
        <h2 className="text-lg font-bold mb-4">{isEditing ? 'Edit transaction' : 'New transaction'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block">Transaction ID</label>
            <input
              type="text"
              value={transactionId}
              readOnly
              className="border border-[#0B81C7] border-opacity-20 rounded w-full py-2 px-3"
            />
          </div>
          <div className="mb-4">
            <label className="block">Date</label>
            <input type="date" className="border border-[#0B81C7] border-opacity-20 rounded w-full py-2 px-3" value={date} onChange={(e) => setDate(e.target.value)} disabled={isLoading} />
          </div>
          <div className="mb-4">
            <label className="block">Customer Name</label>
            <input type="text" className="border border-[#0B81C7] border-opacity-20 rounded w-full py-2 px-3" value={customerId} onChange={(e) => setCustomerId(e.target.value)} disabled={isLoading} />
          </div>
          <div className="mb-4">
            <label className="block">Medication</label>
            <input type="text" className="border border-[#0B81C7] border-opacity-20 rounded w-full py-2 px-3" value={medication} onChange={(e) => setMedication(e.target.value)} disabled={isLoading} />
          </div>
          <div className="mb-4">
            <label className="block">Quantity</label>
            <input type="number" className="border border-[#0B81C7] border-opacity-20 rounded w-full py-2 px-3" value={quantity} onChange={(e) => setQuantity(e.target.value)} disabled={isLoading} />
          </div>
          <div className="mb-4">
            <label className="block">Total Price</label>
            <input type="number" className="border border-[#0B81C7] border-opacity-20 rounded w-full py-2 px-3" value={totalPrice} onChange={(e) => setTotalPrice(e.target.value)} disabled={isLoading} />
          </div>

          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" disabled={isLoading}>
            {isLoading ? (
                <span>Saving...</span>
              ) : isEditing ? (
                'Update'
              ) : (
                'Save'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TransactionModal;