import { useEffect, useState } from 'react';
import axios from "axios";

function CustomerModal({ isOpen, onClose, customerToEdit }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (customerToEdit) {
      setIsEditing(true);
      setFullName(customerToEdit.fullName);
      setEmail(customerToEdit.email);
      setAge(customerToEdit.age);
    } else {
      setIsEditing(false);
      setFullName('');
      setEmail('');
      setAge('');
    }
  }, [customerToEdit]);

  // Handle form submission (create or update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form fields
    if (!fullName || !email || !age) {
      setErrorMessage('All fields are required.');
      return;
    }

    setIsLoading(true);
    try {
      let response;
      if (isEditing) {
        // For Updating Existing Customer Details
        const response = await axios.put(`http://localhost:3001/api/customers/${customerToEdit._id}`, {
          fullName,
          email,
          age,
        });

        if (response.status === 200) {
          onClose();
          window.location.reload(); 
        }
      } else {
        // For Creating New Customer Details
        const response = await axios.post('http://localhost:3001/api/customers', {
          fullName,
          email,
          age,
        });

        if (response.status === 201) {
          onClose();
          window.location.reload(); 
        }
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Error saving customer');
    } finally {
      setIsLoading(false);
    }  
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded shadow-md w-1/3">
        <h2 className="text-lg font-bold mb-4">{isEditing ? 'Edit Customer Details' : 'New Customer Details'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block">Full Name</label>
            <input type="text" className="border border-[#0B81C7] border-opacity-20 rounded w-full py-2 px-3" value={fullName} onChange={(e) => setFullName(e.target.value)} disabled={isLoading} />
          </div>
          <div className="mb-4">
            <label className="block">Email</label>
            <input type="email" className="border border-[#0B81C7] border-opacity-20 rounded w-full py-2 px-3" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading} />
          </div>
          <div className="mb-4">
            <label className="block">Age</label>
            <input type="number" className="border border-[#0B81C7] border-opacity-20 rounded w-full py-2 px-3" value={age} onChange={(e) => setAge(e.target.value)} disabled={isLoading} />
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

export default CustomerModal;